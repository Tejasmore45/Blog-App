// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Import AuthProvider
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import AllPosts from './pages/AllPosts';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider> {/* Wrap the app in AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route for creating a post */}
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />

          {/* Route for viewing a specific post */}
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
