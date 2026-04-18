import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [user, setUser]   = useState(null);
  const navigate          = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/auth/me',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(data);
      } catch {
        logout();
        navigate('/login');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
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
                <div className="text-gray-400 text-sm mb-1">Total Views</div>
                <div className="text-3xl font-semibold">12.5K</div>
                <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  +14.2%
                </div>
              </div>
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="text-gray-400 text-sm mb-1">Active Sessions</div>
                <div className="text-3xl font-semibold">432</div>
                <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  +5.4%
                </div>
              </div>
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="text-gray-400 text-sm mb-1">Engagement</div>
                <div className="text-3xl font-semibold">68%</div>
                <div className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
                  -2.1%
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
            
            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
              Edit Profile
            </button>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-xl mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <button className="text-violet-400 text-sm hover:text-violet-300">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="font-medium">System login successful</div>
                      <div className="text-sm text-gray-400">Authentication token generated</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {i} hour{i > 1 ? 's' : ''} ago
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}