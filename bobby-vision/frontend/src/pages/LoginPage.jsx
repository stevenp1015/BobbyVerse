jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Assuming your backend is running on http://localhost:5000
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);

      // 1. Extract the JWT token assuming it's in a property named `token`
      const token = response.data.token;

      // 2. Store the JWT token in localStorage
      if (token) {
        localStorage.setItem('authToken', token);
        // 3. Redirect the user to the /dashboard route
        window.location.href = '/dashboard'; // Or use React Router's useHistory/useNavigate
      } else {
        setError('Login successful but no token received.');
      }

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // 4. Display an error message to the user
      setError(error.response ? (error.response.data.error || 'Login failed') : 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-shadow-outline" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
        </div>
         {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default LoginPage;