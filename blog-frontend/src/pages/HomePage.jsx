// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="hero-section text-center">
        <h1 className="display-4">Welcome to Our Blog</h1>
        <p className="lead">Explore, learn, and share your thoughts with the community.</p>
        <Link to="/all-posts">
          <button className="btn btn-primary mt-3">Read Latest Posts</button>
        </Link>
      </header>

      <section className="about-section container text-center mt-5">
        <h2>About Our Blog</h2>
        <p className="text-muted">
          We are passionate about web development, technology trends, and all things programming. Our blog covers a variety of topics, from JavaScript frameworks to DevOps, and everything in between.
        </p>
      </section>

      <section className="featured-posts container mt-5">
        <h3 className="text-center">Featured Posts</h3>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">The Evolution of Web Development</h5>
                <p className="card-text text-muted">
                  Web development has changed drastically over the years. Read about the key milestones and future trends.
                </p>
                <button className="btn btn-link">Read More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Introduction to JavaScript Frameworks</h5>
                <p className="card-text text-muted">
                  Explore the world of JavaScript frameworks and find out which one suits your project.
                </p>
                <button className="btn btn-link">Read More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">The Basics of DevOps</h5>
                <p className="card-text text-muted">
                  Learn the essential principles of DevOps and how it can benefit modern development teams.
                </p>
                <button className="btn btn-link">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
