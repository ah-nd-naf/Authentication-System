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

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}