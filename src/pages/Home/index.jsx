// src/pages/Home/index.jsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/style.css'; // Main page styles

const Home = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content home-content">
        <section className="hero">
          <h1>Welcome to CampusJi</h1>
          <p>Your one-stop portal for everything IPM at IIM Rohtak.</p>
          <div className="hero-buttons">
             {/* Add any CTA buttons here */}
          </div>
        </section>

        <section className="features">
           {/* Port content from legacy index.html here */}
           <div className="feature-card">
              <h2>Clubs & Committees</h2>
              <p>Explore the various student bodies.</p>
           </div>
           <div className="feature-card">
              <h2>Services</h2>
              <p>Find local amenities and services.</p>
           </div>
           {/* ... more content ... */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
