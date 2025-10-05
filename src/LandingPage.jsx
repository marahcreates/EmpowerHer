import React from 'react';
import './landing.css';

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing__gradient" aria-hidden="true" />
      <div className="landing__grain" aria-hidden="true" />

      <header className="landing__header">
        <div className="landing__logo">Learn2Earn</div>
        <nav className="landing__nav">
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#rewards">Rewards</a>
          <a href="#community">Community</a>
        </nav>
        <div className="landing__actions">
          <a className="landing__link" href="mailto:hello@learn2earn.com">Partner with us</a>
          <button type="button" className="landing__primary">Join beta</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero__content">
            <p className="hero__eyebrow">Empower. Upskill. Thrive.</p>
            <h1 className="hero__title">Empowering women to lead the future of tech</h1>
            <p className="hero__subtitle">
              Learn2Earn blends curated learning journeys, mentorship, and real-world hiring partners so women can
              access tech careers, earn on-chain rewards, and step into roles that reshape the industry.
            </p>
            <div className="hero__cta">
              <button type="button" className="landing__primary landing__primary--lg">Start your journey</button>
              <button type="button" className="landing__ghost">View curriculum</button>
            </div>
            <div className="hero__stats">
              <div>
                <span className="stat__value">4k+</span>
                <span className="stat__label">Women upskilled</span>
              </div>
              <div>
                <span className="stat__value">92%</span>
                <span className="stat__label">Transitioned into tech roles</span>
              </div>
              <div>
                <span className="stat__value">¢B3TR</span>
                <span className="stat__label">Token rewards earned</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="device-mock">
              <div className="device-mock__header">
                Saved Insights
                <span className="device-mock__badge">AI powered</span>
              </div>
              <div className="device-mock__card">
                <h4>Career Accelerator</h4>
                <p>Track your milestones, unlock mentorship sessions, and receive job-matching alerts in real time.</p>
                <div className="device-mock__progress">
                  <span>Full-stack pathway</span>
                  <div>
                    <span className="bar" />
                    <span className="bar bar--ghost" />
                  </div>
                </div>
              </div>
              <div className="device-mock__card device-mock__card--secondary">
                <h4>Token rewards</h4>
                <p>Earn B3TR for learning sprints, mock interviews, and landing your first role.</p>
                <div className="pill">Claim 120 B3TR</div>
              </div>
            </div>
            <div className="floating-tag floating-tag--left">Collect badges • Join cohorts • Hire talent</div>
            <div className="floating-tag floating-tag--right">Future-proof skills • Inclusive mentors • Job ready</div>
          </div>
        </section>

        <section id="problem" className="section section--grid">
          <div className="section__header">
            <h2>The gap we tackle</h2>
            <p>
              Women face limited access to mentorship, real-world experience, and hiring pathways in tech. We connect
              the dots with structured learning, community, and guaranteed opportunities to prove their skills.
            </p>
          </div>
          <div className="section__grid">
            <article className="card">
              <h3>Untapped potential</h3>
              <p>Tech roles remain 3x more likely to go to men despite women surpassing completion rates in online programs.</p>
            </article>
            <article className="card">
              <h3>Fragmented learning</h3>
              <p>Bootcamps rarely bridge the gap between coursework and role readiness. We embed portfolio challenges that mirror hiring tests.</p>
            </article>
            <article className="card">
              <h3>Lack of recognition</h3>
              <p>With on-chain credentials and B3TR incentives, every milestone is trackable, verifiable, and rewarded.</p>
            </article>
          </div>
        </section>

        <section id="solution" className="section section--cards">
          <div className="section__header">
            <h2>How Learn2Earn accelerates outcomes</h2>
          </div>
          <div className="section__cards">
            <article className="card card--glass">
              <span className="card__badge">01</span>
              <h3>Curated learning tracks</h3>
              <p>Choose from AI, blockchain, and product engineering journeys built with industry mentors.</p>
            </article>
            <article className="card card--glass">
              <span className="card__badge">02</span>
              <h3>Live mentorship pods</h3>
              <p>Weekly sessions with senior women in tech to review code, portfolios, and interview strategies.</p>
            </article>
            <article className="card card--glass">
              <span className="card__badge">03</span>
              <h3>Direct-to-hire pipelines</h3>
              <p>Partner companies source talent straight from each graduating cohort with performance data baked in.</p>
            </article>
          </div>
        </section>

        <section id="rewards" className="section section--accent">
          <div className="section__header">
            <h2>Earn B3TR tokens as you grow</h2>
            <p>
              Our token economy recognises the work it takes to switch careers. Collect rewards for learning streaks,
              verified skills, community leadership, and when you land a job through Learn2Earn partners.
            </p>
          </div>
          <div className="reward-grid">
            <div className="reward-card">
              <h3>Learning streaks</h3>
              <p>Daily sprints and project submissions unlock progressive B3TR tranches.</p>
              <span className="reward-card__amount">+20 B3TR</span>
            </div>
            <div className="reward-card">
              <h3>Mentor feedback</h3>
              <p>Apply peer and mentor feedback, then mint proof-of-learning credentials.</p>
              <span className="reward-card__amount">+45 B3TR</span>
            </div>
            <div className="reward-card">
              <h3>Job placement</h3>
              <p>Secure a role with a partner company and receive a one-time reward bonus.</p>
              <span className="reward-card__amount">+300 B3TR</span>
            </div>
          </div>
        </section>

        <section id="community" className="section section--split">
          <div className="section__media">
            <div className="community-card">
              <h3>Global sisterhood</h3>
              <p>Join curated cohorts across continents with asynchronous pods, demo days, and global meetups.</p>
              <span className="community-card__meta">16 active cities · 40+ mentors</span>
            </div>
            <div className="community-card community-card--outline">
              <h3>Partner with us</h3>
              <p>Hire top performing graduates, host a challenge, or mentor the next wave of leaders.</p>
              <button type="button" className="landing__ghost landing__ghost--tight">Become a partner</button>
            </div>
          </div>
          <div className="section__copy">
            <h2>Community-led, outcome-driven</h2>
            <p>
              We are building an ecosystem where women create, launch, and scale products together. From hackathons to
              paid apprenticeships, every experience is designed to translate effort into opportunity.
            </p>
            <ul className="bullet-list">
              <li>Weekly accountability rituals and demo showcases</li>
              <li>Employer-backed capstone projects with real budgets</li>
              <li>Scholarships funded by B3TR treasury and impact partners</li>
            </ul>
          </div>
        </section>

        <section className="section cta">
          <div className="cta__content">
            <h2>Ready to rewrite tech with us?</h2>
            <p>
              Secure your spot in the next cohort and start earning rewards for every milestone on your path to a
              high-impact role.
            </p>
          </div>
          <div className="cta__actions">
            <button type="button" className="landing__primary landing__primary--lg">Apply now</button>
            <button type="button" className="landing__ghost">Download whitepaper</button>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <span>© {new Date().getFullYear()} Learn2Earn Collective</span>
        <div className="footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Brand</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
