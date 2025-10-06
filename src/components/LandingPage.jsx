import React from 'react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="EmpowerHer" className="logo-icon" />
            <span className="logo-text">EmpowerHer</span>
          </div>
          <div className="nav-links">
            <a href="#courses">Courses</a>
            <a href="#community">Community</a>
            <a href="#resources">Resources</a>
            <a href="#mentorship">Mentorship</a>
          </div>
          <button className="nav-get-started" onClick={onGetStarted}>
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Empowering Women in Tech</h1>
          <p className="hero-subtitle">
            Join a vibrant community of women breaking barriers in the tech industry.<br />
            Access tailored courses, mentorship, and resources to accelerate your career.
          </p>
          <button className="hero-cta" onClick={onGetStarted}>
            Connect Wallet
          </button>
        </div>
        <div className="hero-image">
          <img src="/hero.png" alt="EmpowerHer Hero" style={{ transform: 'scaleX(-1)', width: '600px', borderRadius: '20px' }} />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h2 className="features-title">Key Features</h2>
        <p className="features-subtitle">
          Explore the features designed to support your journey in tech.
        </p>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="feature-content">
              <h3>Earn Rewards for Learning</h3>
              <p>
                Gain points and unlock exclusive rewards as you progress through
                our courses. Your dedication to learning is recognized and
                celebrated.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="feature-content">
              <h3>Earn Rewards for Securing a Job</h3>
              <p>
                Receive a significant bonus upon landing a job through our platform.
                We invest in your success and celebrate your achievements.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="feature-content">
              <h3>AI-Powered Course Creation</h3>
              <p>
                Experience personalized learning with courses crafted by our AI,
                tailored to your specific needs and career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Transform Your Career?</h2>
        <p className="cta-subtitle">
          Join EmpowerHer today and take the first step towards a rewarding career in<br />
          technology.
        </p>
        <button className="cta-button" onClick={onGetStarted}>
          Connect Wallet
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <p className="footer-copyright">
          © 2024 EmpowerHer. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
