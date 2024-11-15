import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post data using the ID
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then(response => {
        setPost(response.data); // Set the fetched post data in the state
        setLoading(false); // Stop loading when data is fetched
      })
      .catch(error => {
        // Handle error when post is not found or other issues
        if (error.response && error.response.status === 404) {
          setError("Post not found.");
        } else {
          setError("There was an error fetching the post.");
        }
        setLoading(false);
        console.error("Error fetching the post:", error);
      });
  }, [id]); // Refetch when the ID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-detail container mt-5">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* You can add more details about the post as needed */}
      <button className="btn btn-primary" onClick={() => navigate('/all-posts')}>
        Back to All Posts
      </button>
    </div>
  );
}

export default PostDetails;
