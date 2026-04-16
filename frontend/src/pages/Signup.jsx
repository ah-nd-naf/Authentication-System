import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function Signup() {
  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/signup', form
      );
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <AuthLayout>
      <div className="bg-[#111827] rounded-2xl border border-gray-800 p-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Link
            to="/login"
            className="flex-1 text-center py-2 rounded-lg bg-gray-800 text-gray-400 text-sm hover:text-white transition"
          >
            Login
          </Link>
          <span className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
            Sign up
          </span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-1">Create account</h2>
        <p className="text-gray-500 text-sm mb-6">Sign up to get started</p>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Fields */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5">Name</label>
          <input
            type="text"
            placeholder="Ahnaf Rashid"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyDown={handleKey}
            className="w-full bg-gray-900 text-white placeholder-gray-600 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="ahnaf@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={handleKey}
            className="w-full bg-gray-900 text-white placeholder-gray-600 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs text-gray-400 mb-1.5">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKey}
            className="w-full bg-gray-900 text-white placeholder-gray-600 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition text-sm"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-center text-gray-600 text-xs mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition">
            Login
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}