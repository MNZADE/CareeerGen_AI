import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import homebg from "../videos/homebg.mp4";

export default function Home() {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/login");
    } else {
      alert("⚠️ Please log in first to start building your resume.");
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: #0a0f1c;
          color: #ffffff;
          overflow-x: hidden;
        }

        /* 🌐 NAVBAR */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          z-index: 1000;
          background: transparent; /* ✅ Fully transparent */
          border-bottom: none;
        }

        .navbar h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .navbar h2 span {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar button {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border: none;
          color: #fff;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
          margin-right: 80px; /* ✅ Shifted left slightly */
        }

        .navbar button:hover {
          transform: translateY(-3px);
        }

        .hero {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          height: 100vh;
          overflow: hidden;
        }

        .hero video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          filter: brightness(0.4);
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: #fff;
        }

        .hero span {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          margin-top: 20px;
          color: #cbd5e1;
          line-height: 1.8;
          font-size: 1.2rem;
          max-width: 800px;
          text-align: center;
        }

        .hero button {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border: none;
          color: #fff;
          padding: 14px 30px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 40px;
          cursor: pointer;
          transition: 0.3s;
        }

        .hero button:hover {
          transform: translateY(-4px);
        }

        .info-section {
          padding: 100px 60px;
          max-width: 1200px;
          margin: auto;
          text-align: center;
        }

        .info-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #60a5fa;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          transition: 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .info-card:hover {
          transform: translateY(-10px);
          border-color: #60a5fa;
        }

        .info-card img {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 10px rgba(96,165,250,0.4));
        }

        .info-card h3 {
          color: #60a5fa;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .info-card p {
          color: #cbd5e1;
          font-size: 1rem;
          line-height: 1.6;
        }

        .footer-text {
          margin-top: 60px;
          font-weight: 600;
          color: #cbd5e1;
          font-size: 1.1rem;
        }

        .footer-text span {
          color: #60a5fa;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 15px 25px;
          }

          .navbar button {
            margin-right: 40px; /* Adjust for small screens */
          }

          .hero h1 {
            font-size: 2.3rem;
          }
        }
      `}</style>

      <div className="home">
        {/* 🌐 NAVBAR */}
        <nav className="navbar">
          <h2>
            CareerGen <span>AI</span>
          </h2>
          <button onClick={handleLogin}>Login</button>
        </nav>

        {/* 🎥 HERO SECTION */}
        <section className="hero">
          <video autoPlay loop muted playsInline>
            <source src={homebg} type="video/mp4" />
          </video>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>
              Build Smarter <span>Resumes</span> with <span>AI</span>
            </h1>
            <p>
              CareerGen AI helps you design, refine, and optimize your resume — 
              powered by artificial intelligence and tailored job insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartBuilding}
            >
              Start Building Your Resume
            </motion.button>
          </motion.div>
        </section>

        {/* 💼 INFO SECTION */}
        <section className="info-section" id="about">
          <motion.h2
            className="info-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover What CareerGen AI Offers
          </motion.h2>

          <div className="info-grid">
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                alt="AI Resume"
              />
              <h3>AI-Powered Resume Builder</h3>
              <p>
                Create stunning, job-ready resumes with AI suggestions and
                keyword optimization to make your skills stand out.
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Modern Templates"
              />
              <h3>Modern Templates</h3>
              <p>
                Choose from professional templates crafted to impress recruiters
                and optimize your resume for ATS systems.
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2829/2829787.png"
                alt="Job Matching"
              />
              <h3>Smart Job Matching</h3>
              <p>
                Discover job listings that perfectly match your skills and
                experience with CareerGen’s AI job recommender.
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                alt="Cloud Storage"
              />
              <h3>Secure Cloud Storage</h3>
              <p>
                Store and access your resumes anytime, anywhere — safely on our
                encrypted cloud servers.
              </p>
            </motion.div>
          </div>

          <motion.p
            className="footer-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Start your professional journey with <span>CareerGen AI</span> — your intelligent career companion.
          </motion.p>
        </section>
      </div>
    </>
  );
}
