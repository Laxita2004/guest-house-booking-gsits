import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Register.css";

const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Register = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateUsername = (value) => {
    let error = "";
    if (/^\d/.test(value)) error = "❌ Username cannot start with a digit.";
    setErrors((prev) => ({ ...prev, username: error }));
  };

  const validatePassword = (value) => {
    let error = "";
    if (value.length < 6) error = "❌ Password must be at least 6 characters.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "❌ Must include a special character.";
    else if (!/\d/.test(value)) error = "❌ Must contain at least one digit.";
    setErrors((prev) => ({ ...prev, password: error }));

    if (value.length < 6) setPasswordStrength("Weak ❌");
    else if (/[!@#$%^&*(),.?":{}|<>]/.test(value) && /\d/.test(value)) setPasswordStrength("Strong ✅");
    else setPasswordStrength("Medium ⚠");
  };

  const validateCaptcha = (value) => {
    let error = value !== captcha ? "❌ Incorrect Captcha!" : "";
    setErrors((prev) => ({ ...prev, captcha: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.username && !errors.password && !errors.captcha) {
      alert("Registration Successful!");
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setEnteredCaptcha(""); // Clear input
  };

  return (
    <div className="container">
      <div className="blue-header">
        <img src="/sgsits_logo.png" alt="gs-logo" />
        <span className="gs">
          SHRI GOVINDERAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
        </span>
      </div>
      <div className="reg-container">
        <div className="reg-box">
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
              {password && <span className={`strength ${passwordStrength}`}>{passwordStrength}</span>}
            </div>

            {/* Captcha Field */}
            <div className="captcha-box">
              <span className="captcha-text">{captcha}</span>
              <button type="button" className="refresh-btn" onClick={refreshCaptcha}>🔄</button>
            </div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={enteredCaptcha}
              onChange={(e) => {
                setEnteredCaptcha(e.target.value);
                validateCaptcha(e.target.value);
              }}
              required
            />
            {errors.captcha && <span className="error">{errors.captcha}</span>}
<br/>
            {/* Register Button */}
            <button type="submit" className="reg-btn">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
