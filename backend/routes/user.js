const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const protect = require('../middleware/protect');

// Get Dashboard Data
router.get('/dashboard-data', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Calculate account age in days
    const accountAgeMs = Date.now() - new Date(user.createdAt).getTime();
    const accountAgeDays = Math.floor(accountAgeMs / (1000 * 60 * 60 * 24));

    // Get total logins
    const totalLogins = await ActivityLog.countDocuments({
      userId: req.user.id,
      action: 'Logged In'
    });

    // Get all actions count (for engagement metric placeholder)
    const totalActions = await ActivityLog.countDocuments({
      userId: req.user.id
    });

    // Get recent activity (last 5)
    const recentActivity = await ActivityLog.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        accountAgeDays,
        totalLogins,
        totalActions
      },
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
});

// Update Profile
router.put('/profile', protect, async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    await ActivityLog.create({
      userId: user._id,
      action: 'Profile Updated',
      description: 'User updated their profile information'
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

module.exports = router;
