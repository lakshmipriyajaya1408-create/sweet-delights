import { useState } from "react";
import "./Auth.css";

function Signup({ goToLogin, goHome }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully! 🎉");

    goToLogin();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">🎂</div>

          <h1>Create Account</h1>

          <p>Join Sweet Delights and order your favourite cakes!</p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSignup}
        >
          <div>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account 🎉
          </button>
        </form>

        <div className="auth-switch">
          Already have an account?{" "}
          <button onClick={goToLogin}>
            Login
          </button>
        </div>

        <button
          className="back-home-btn"
          onClick={goHome}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Signup;