import { useState } from "react";
import "./Auth.css";

function Login({ goToSignup, goToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser) {
      alert("No account found. Please create an account first.");
      goToSignup();
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      alert(`Welcome back, ${savedUser.name}! 🎂`);

      goToHome();
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">🎂</div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue ordering delicious cakes!
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Login 🍰
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={goToSignup}
          >
            Create Account
          </button>
        </div>

        <button
          type="button"
          className="back-home-btn"
          onClick={goToHome}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Login;