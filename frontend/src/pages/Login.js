import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginBg from "../assets/loginbg.jpg"; // ✅ Local image path

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fixed: Correct backend API route
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store real JWT token returned from backend
        localStorage.setItem("token", data.token);
        alert("✅ Login successful!");
        navigate("/dashboard");
      } else {
        alert(`⚠️ ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to access your AI-powered account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-message">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </motion.div>

      {/* ✅ Inline styling for glassmorphism design */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          height: 100%;
        }

        .login-page {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url(${loginBg}) no-repeat center center/cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          z-index: 1;
        }

        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 400px;
          padding: 50px 30px;
          border-radius: 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .login-card h2 {
          color: #fff;
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .login-card .subtitle {
          color: #d1d5db;
          margin-bottom: 30px;
          font-size: 1rem;
        }

        .input-group {
          width: 100%;
          margin-bottom: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          margin-bottom: 6px;
          color: #d1d5db;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          padding: 14px 12px;
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1rem;
          transition: background 0.3s, transform 0.3s;
        }

        .input-group input:focus {
          background: rgba(255,255,255,0.25);
          transform: scale(1.02);
        }

        .login-card button {
          width: 100%;
          padding: 14px;
          margin-top: 10px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .login-card button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .register-message {
          margin-top: 20px;
          color: #d1d5db;
          font-size: 0.95rem;
        }

        .register-message a {
          color: #60a5fa;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s;
        }

        .register-message a:hover {
          color: #3b82f6;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
