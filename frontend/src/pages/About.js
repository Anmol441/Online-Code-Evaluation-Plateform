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
          padding: 6rem 2rem;
          background: radial-gradient(circle at top, #1e293b, #020617);
        }

        .hero h1 {
          font-size: 3.2rem;
          font-weight: 800;
          background: linear-gradient(90deg, #6366f1, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          margin-top: 1rem;
          color: #94a3b8;
          font-size: 1.15rem;
          max-width: 700px;
          margin-inline: auto;
        }

        /* SECTION */
        .section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.8rem;
        }

        /* CARD */
        .card {
          background: #1e293b;
          padding: 2rem;
          border-radius: 18px;
          transition: 0.3s;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .card:hover {
          transform: translateY(-10px);
          border-color: #6366f1;
          box-shadow: 0 15px 35px rgba(99,102,241,0.25);
        }

        .card h3 {
          margin-bottom: 0.6rem;
          color: #6366f1;
        }

        .card p {
          color: #cbd5f5;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* ABOUT TEXT */
        .about-text {
          text-align: center;
          max-width: 800px;
          margin: auto;
          color: #94a3b8;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* STATS */
        .stats {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 2rem;
          text-align: center;
        }

        .stat {
          font-size: 2.2rem;
          font-weight: 800;
          color: #22c55e;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        /* CTA */
        .cta {
          text-align: center;
          padding: 5rem 2rem;
        }

        .cta h2 {
          font-size: 2rem;
        }

        .cta button {
          margin-top: 1.5rem;
          background: linear-gradient(90deg, #6366f1, #22c55e);
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .cta button:hover {
          transform: scale(1.07);
          box-shadow: 0 10px 25px rgba(99,102,241,0.3);
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 2rem;
          color: #64748b;
          font-size: 0.9rem;
        }

        @media(max-width:768px){
          .hero h1 { font-size: 2.4rem; }
        }
      `}</style>

      <div className="about-page">

        {/* HERO */}
        <section className="hero">
          <h1>About CodeEval</h1>
          <p>
            CodeEval is a modern coding platform designed to help developers practice,
            evaluate, and improve their programming skills through real-world challenges
            and instant feedback.
          </p>
        </section>

        {/* ABOUT DESCRIPTION */}
        <section className="section">
          <p className="about-text">
            Our platform bridges the gap between learning and real-world coding by providing
            an interactive environment where users can write, execute, and test their code.
            With a focus on performance, scalability, and user experience, CodeEval empowers
            students and developers to grow efficiently.
          </p>
        </section>

        {/* FEATURES */}
        <section className="section">
          <h2 className="section-title">Core Features</h2>

          <div className="grid">
            <div className="card">
              <h3>💻 Code Execution</h3>
              <p>Run code in multiple languages using a secure container-based system.</p>
            </div>

            <div className="card">
              <h3>⚡ Instant Results</h3>
              <p>Get real-time output and evaluation with optimized performance.</p>
            </div>

            <div className="card">
              <h3>📚 Structured Learning</h3>
              <p>Access tutorials and curated problems from beginner to advanced.</p>
            </div>

            <div className="card">
              <h3>📊 Progress Tracking</h3>
              <p>Analyze your coding journey with detailed insights and stats.</p>
            </div>

            <div className="card">
              <h3>🔐 Secure Execution</h3>
              <p>All code runs inside isolated Docker containers for safety.</p>
            </div>

            <div className="card">
              <h3>🌍 Scalable System</h3>
              <p>Built with MERN stack and Docker for high performance.</p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section">
          <h2 className="section-title">Our Impact</h2>

          <div className="stats">
            <div>
              <div className="stat">10K+</div>
              <div className="stat-label">Developers</div>
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
          <h2>Start Coding Today 🚀</h2>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Improve your skills with real-time coding challenges.
          </p>
          <button>Explore Platform</button>
        </section>

        {/* FOOTER */}
        <div className="footer">
          © {new Date().getFullYear()} CodeEval • Built using MERN & Docker
        </div>

      </div>
    </>
  );
};

export default About;