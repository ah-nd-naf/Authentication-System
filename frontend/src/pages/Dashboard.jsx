import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import API_URL from '../config';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({ stats: null, activities: [] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, dataRes] = await Promise.all([
          axios.get(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/api/user/dashboard-data`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setUser(userRes.data);
        setDashboardData({
          stats: dataRes.data.stats,
          activities: dataRes.data.recentActivity
        });
      } catch {
        logout();
        navigate('/login');
      }
    };
    fetchDashboardData();
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
    // Optionally refetch activities here if you want to immediately show the "Profile Updated" log
    axios.get(`${API_URL}/api/user/dashboard-data`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDashboardData({
        stats: res.data.stats,
        activities: res.data.recentActivity
      })).catch(console.error);
  };

  if (!user || !dashboardData.stats) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { stats, activities } = dashboardData;

  const timeAgo = (dateString) => {
    const ms = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(ms / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${Math.floor(hours / 24)} day${Math.floor(hours / 24) !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user}
        onUpdate={handleProfileUpdate}
      />

      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Nexus Dashboard
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-sm text-gray-400">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Welcome Card */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
            <h1 className="text-4xl font-semibold mb-2">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{user.name}</span>
            </h1>
            <p className="text-gray-400 mb-8 text-lg">Here's what's happening with your account today.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="text-gray-400 text-sm mb-1">Total Logins</div>
                <div className="text-3xl font-semibold">{stats.totalLogins}</div>
                <div className="text-violet-400 text-sm mt-2 flex items-center gap-1">
                  Active sessions
                </div>
              </div>
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="text-gray-400 text-sm mb-1">Account Age</div>
                <div className="text-3xl font-semibold">{stats.accountAgeDays}</div>
                <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                  Days old
                </div>
              </div>
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="text-gray-400 text-sm mb-1">Total Actions</div>
                <div className="text-3xl font-semibold">{stats.totalActions}</div>
                <div className="text-fuchsia-400 text-sm mt-2 flex items-center gap-1">
                  Platform engagement
                </div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-600 p-[2px] mb-4">
              <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-400 mb-6">{user.email}</p>
            
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium active:scale-95"
            >
              Edit Profile
            </button>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-xl mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
            </div>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity._id} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{activity.action}</div>
                        <div className="text-sm text-gray-400">{activity.description || 'Action performed'}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {timeAgo(activity.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent activity found.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}