import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AllPosts.css';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching posts from the backend API
    axios.get('http://localhost:8080/api/posts/all') // Update this endpoint according to your API
      .then((response) => {
        setPosts(response.data);
        setLoading(false); // Stop loading when posts are fetched
      })
      .catch((error) => {
        setError("There was an error fetching the posts.");
        setLoading(false);
        console.error("Error fetching posts:", error);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-container container">
      <h2 className="text-center mt-5">All Blog Posts</h2>
      <div className="row mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.excerpt}</p>
                  {/* Use Link component for navigation */}
                  <Link to={`/post/${post.id}`} className="btn btn-link">Read More</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
