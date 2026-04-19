const express = require('express'); // main framework, create a server and handle requests
const mongoose = require('mongoose');
const cors = require('cors');  // allows React frontend to communicate with your backend
require('dotenv').config();    // loads secret values from your .env file
const app = express();   //  creates your actual server.

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ MongoDB connection failed:', err.message);
  });