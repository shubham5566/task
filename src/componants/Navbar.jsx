import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';



const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is 
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };


  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <Link to="/homepage" className="text-white hover:text-gray-300 font-semibold">Home</Link>
        {/* <Link to="/userdata" className="text-white hover:text-gray-300 font-semibold">User Data</Link> */}
        <Link to="/settings" className="text-white hover:text-gray-300 font-semibold">Settings</Link>
       
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
    
      

     
    </nav>
  );
};

export default Navbar;