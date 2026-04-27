import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .about-page {
          background: #0f172a;
          color: #fff;
          min-height: 100vh;
        }

        /* HERO */
        .hero {
          text-align: center;
          padding: 5rem 2rem;
          background: radial-gradient(circle at top, #1e293b, #020617);
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(90deg, #6366f1, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          margin-top: 1rem;
          color: #94a3b8;
          font-size: 1.1rem;
        }

        /* SECTION */
        .section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: auto;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        /* CARD */
        .card {
          background: #1e293b;
          padding: 2rem;
          border-radius: 16px;
          transition: 0.3s;
          border: 1px solid transparent;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: #6366f1;
          box-shadow: 0 10px 30px rgba(99,102,241,0.2);
        }

        .card h3 {
          margin-bottom: 0.5rem;
          color: #6366f1;
        }

        .card p {
          color: #cbd5f5;
          font-size: 0.95rem;
        }

        /* STATS */
        .stats {
          display: flex;
          justify-content: space-around;
          text-align: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .stat {
          font-size: 2rem;
          font-weight: 700;
          color: #22c55e;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        /* CTA */
        .cta {
          text-align: center;
          padding: 4rem 2rem;
        }

        .cta button {
          background: linear-gradient(90deg, #6366f1, #22c55e);
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .cta button:hover {
          transform: scale(1.05);
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 2rem;
          color: #64748b;
          font-size: 0.9rem;
        }

        /* RESPONSIVE */
        @media(max-width:768px){
          .hero h1 { font-size: 2.2rem; }
        }
      `}</style>

      <div className="about-page">

        {/* HERO */}
        <section className="hero">
          <h1>About CodeEval Platform</h1>
          <p>
            A powerful online coding evaluation platform to learn, practice, and excel in programming.
          </p>
        </section>

        {/* FEATURES */}
        <section className="section">
          <h2 className="section-title">What We Offer</h2>

          <div className="grid">
            <div className="card">
              <h3>💻 Real Coding Environment</h3>
              <p>Write, compile, and run code in multiple languages instantly.</p>
            </div>

            <div className="card">
              <h3>📚 Learning Hub</h3>
              <p>Structured tutorials like top platforms to master concepts.</p>
            </div>

            <div className="card">
              <h3>⚡ Instant Evaluation</h3>
              <p>Automatic judging system with fast and accurate results.</p>
            </div>

            <div className="card">
              <h3>📊 Performance Tracking</h3>
              <p>Monitor your growth, submissions, and ranking.</p>
            </div>

            <div className="card">
              <h3>🧠 Smart Practice</h3>
              <p>Curated problems from beginner to advanced levels.</p>
            </div>

            <div className="card">
              <h3>🔐 Secure Platform</h3>
              <p>Reliable and safe environment for coding assessments.</p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section">
          <h2 className="section-title">Platform Impact</h2>

          <div className="stats">
            <div>
              <div className="stat">10K+</div>
              <div className="stat-label">Users</div>
            </div>
            <div>
              <div className="stat">5K+</div>
              <div className="stat-label">Problems</div>
            </div>
            <div>
              <div className="stat">50K+</div>
              <div className="stat-label">Submissions</div>
            </div>
            <div>
              <div className="stat">4+</div>
              <div className="stat-label">Languages</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Start Your Coding Journey Today 🚀</h2>
          <p style={{margin:"1rem 0", color:"#94a3b8"}}>
            Practice. Learn. Grow.
          </p>
          <button>Get Started</button>
        </section>

        {/* FOOTER */}
        <div className="footer">
          © {new Date().getFullYear()} CodeEval Platform • Built for Developers
        </div>

      </div>
    </>
  );
};

export default About;