import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useContext(AuthContext); // Access login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(''); // Reset error message before sending the request
    setLoading(true); // Set loading state to true

    try {
      // Make the login request
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Check if token is received
      if (token) {
        console.log('Login successful, received token:', token);

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Update authentication status in the context
        login(token);

        // Log the successful login and redirection
        console.log('User authenticated, redirecting to /all-posts');

        // Redirect to the all-posts page or a protected route
        navigate('/all-posts');
      } else {
        // Handle cases where token is not received
        console.error('No token received from server');
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      // Handle errors during login
      console.error('Error during login:', err.response || err.message);
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after request is completed
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
