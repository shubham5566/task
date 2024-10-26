import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is authenticated

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      )}
    </div>
  );
};

export default Settings;