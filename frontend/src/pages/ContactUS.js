import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background: #eef2ff;
        }

        .contact-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .contact-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1100px;
          width: 100%;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        /* LEFT SIDE */
        .contact-left {
          background: #6366f1;
          color: white;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-left h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .contact-left p {
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .info {
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .info strong {
          display: block;
          font-size: 0.85rem;
          opacity: 0.8;
        }

        /* RIGHT SIDE */
        .contact-right {
          padding: 3rem;
        }

        .contact-right h2 {
          margin-bottom: 1.5rem;
          color: #111827;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 0.9rem;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          transition: 0.3s;
          font-size: 0.95rem;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.15);
        }

        .input-group textarea {
          height: 120px;
          resize: none;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 50px;
          background: #6366f1;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-btn:hover {
          background: #4f46e5;
          transform: translateY(-2px);
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
          color: #6b7280;
          font-size: 0.85rem;
        }

        /* RESPONSIVE */
        @media(max-width: 768px){
          .contact-card {
            grid-template-columns: 1fr;
          }

          .contact-left {
            text-align: center;
          }
        }
      `}</style>

      <div className="contact-wrapper">
        <div className="contact-card">

          {/* LEFT */}
          <div className="contact-left">
            <h1>Contact Us</h1>
            <p>We’re here to help you with anything related to CodeEval.</p>

            <div className="info">
              <strong>Email</strong>
              support@codeeval.com
            </div>

            <div className="info">
              <strong>Phone</strong>
              +91 98765 43210
            </div>

            <div className="info">
              <strong>Location</strong>
              India
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-right">
            <h2>Send Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  required
                />
              </div>

              <button className="submit-btn">Send Message</button>
            </form>

            <div className="footer">
              © {new Date().getFullYear()} CodeEval Platform
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;