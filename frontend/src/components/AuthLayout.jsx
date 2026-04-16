// src/components/AuthLayout.jsx
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#6366f1_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#c026d3_0%,transparent_60%)]"></div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/60">
              <span className="text-white font-black text-4xl">A</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tighter">Authify</h1>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => navigate('/login')}
              className={`flex-1 py-5 text-sm font-semibold transition-all ${
                isLogin 
                  ? 'text-white border-b-4 border-violet-400 bg-white/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className={`flex-1 py-5 text-sm font-semibold transition-all ${
                !isLogin 
                  ? 'text-white border-b-4 border-violet-400 bg-white/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-10 min-h-[480px]">
            {children}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-10">
          © 2026 Authify • Built with passion
        </p>
      </div>
    </div>
  );
}