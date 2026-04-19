import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white mb-1">Welcome back</h2>
        <p className="text-gray-400">Sign in to access your account</p>
      </div>

      {error && <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-4 rounded-2xl text-sm">{error}</div>}

      <div className="space-y-5">
        <div>
          <label className="text-sm text-gray-300 mb-2 block">Email Address</label>
          <input
            type="email"
            placeholder="ahnaf@example.com"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 py-4 rounded-2xl font-semibold text-white text-lg active:scale-95 transition-all disabled:opacity-70"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}