import React from 'react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">TechBloom</span>
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
          <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
            {/* Background shapes */}
            <rect x="50" y="50" width="500" height="400" rx="20" fill="#f5e6d3"/>

            {/* Woman 1 - Left */}
            <ellipse cx="220" cy="380" rx="80" ry="100" fill="#e8c4a8"/>
            <path d="M 220 280 Q 180 250 180 200 Q 180 150 220 150 Q 260 150 260 200 Q 260 250 220 280" fill="#f4d4b8"/>
            <ellipse cx="220" cy="200" rx="40" ry="50" fill="#f4d4b8"/>
            <path d="M 180 180 Q 170 150 180 120 Q 200 100 220 105 Q 240 100 260 120 Q 270 150 260 180" fill="#2d1810"/>
            <path d="M 180 180 Q 160 160 150 140 L 165 135 Q 175 155 180 180" fill="#2d1810"/>
            <path d="M 260 180 Q 280 160 290 140 L 275 135 Q 265 155 260 180" fill="#2d1810"/>
            <rect x="180" y="280" width="80" height="120" rx="10" fill="#e8d4c0"/>
            <circle cx="205" cy="210" r="3" fill="#2d1810"/>
            <circle cx="235" cy="210" r="3" fill="#2d1810"/>
            <path d="M 210 230 Q 220 235 230 230" stroke="#c98866" strokeWidth="2" fill="none"/>

            {/* Woman 2 - Right */}
            <ellipse cx="380" cy="380" rx="80" ry="100" fill="#a67c52"/>
            <path d="M 380 280 Q 340 250 340 200 Q 340 150 380 150 Q 420 150 420 200 Q 420 250 380 280" fill="#c9916a"/>
            <ellipse cx="380" cy="200" rx="40" ry="50" fill="#c9916a"/>
            <path d="M 340 180 Q 330 150 340 120 Q 360 100 380 105 Q 400 100 420 120 Q 430 150 420 180" fill="#1a0f08"/>
            <path d="M 340 180 Q 320 160 310 140 L 325 135 Q 335 155 340 180" fill="#1a0f08"/>
            <path d="M 420 180 Q 440 160 450 140 L 435 135 Q 425 155 420 180" fill="#1a0f08"/>
            <rect x="340" y="280" width="80" height="120" rx="10" fill="#4a7c7e"/>
            <circle cx="365" cy="210" r="3" fill="#1a0f08"/>
            <circle cx="395" cy="210" r="3" fill="#1a0f08"/>
            <path d="M 370 230 Q 380 235 390 230" stroke="#8b5a3c" strokeWidth="2" fill="none"/>

            {/* Chairs */}
            <rect x="160" y="380" width="120" height="15" fill="#8b4513"/>
            <rect x="175" y="395" width="10" height="80" fill="#8b4513"/>
            <rect x="265" y="395" width="10" height="80" fill="#8b4513"/>
            <rect x="175" y="395" width="100" height="10" fill="#8b4513"/>

            <rect x="320" y="380" width="120" height="15" fill="#8b4513"/>
            <rect x="335" y="395" width="10" height="80" fill="#8b4513"/>
            <rect x="425" y="395" width="10" height="80" fill="#8b4513"/>
            <rect x="335" y="395" width="100" height="10" fill="#8b4513"/>
          </svg>
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
          Join TechBloom today and take the first step towards a rewarding career in<br />
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
          © 2024 TechBloom. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
