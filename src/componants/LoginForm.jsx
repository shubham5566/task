import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      // Dispatch login action with the username
      dispatch(login({ username }));
      navigate('/homepage'); // Redirect to the home page after login
    } else {
      setError('Invalid username or password');
    }
  };



  return (
    <form onSubmit={handleSubmit} className="p-4 w-1/2 mx-auto mt-16 bg-gray-100 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
       {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;