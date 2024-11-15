import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Log the token to see if it's being retrieved correctly

    if (!token) {
      setError('You must be logged in to create a post');
      console.log('No token found, user not logged in'); // Log when token is not found
      return;
    }

    try {
      // Make the API request with the token in the Authorization header
      const response = await axios.post(
        'http://localhost:8080/api/posts/create',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Post created successfully:', response.data); // Log the successful post creation response
      navigate('/all-posts'); // Redirect to all posts after successful creation
    } catch (err) {
      // Enhanced error handling
      console.error('Error creating post:', err.response || err.message); // Log the error response
      if (err.response) {
        // Show more detailed error message if available
        setError(err.response.data || 'Failed to create post. Please try again.');
      } else {
        setError('Failed to create post. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
