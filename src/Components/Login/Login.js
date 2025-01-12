import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Loader/Load.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/auth/login", { email, password });
      const token = result.data.token;
      if (token) {
        localStorage.setItem("token", token); // Stockez le token
        navigate("/dashboard");
      } else {
        throw new Error("Missing token in the response.");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page" style={{ backgroundColor: "#ffe4b5", minHeight: "100vh" }}>
      <section className="login">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-lg-6">
              <div className="card-body p-5" style={{ background: "#fff3e0", borderRadius: "10px" }}>
                <h2 className="card-title mb-4 text-center" style={{ color: "#e63946", fontWeight: "bold" }}>
                  🍕 Login to Pizzeria
                </h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      style={{ borderColor: "#e63946" }}
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      style={{ borderColor: "#e63946" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      className="eye-icon position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{
                        background: "#e63946",
                        borderColor: "#e63946",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </div>

                  <div className="text-center">
                    <Link to="/forgot-password" style={{ color: "#6a0572" }}>
                      Forgot Password?
                    </Link>
                    <Link
                      to="/register"
                      className="d-block mt-2"
                      style={{ color: "#e63946", fontWeight: "bold" }}
                    >
                      Create an Account
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-block text-center">
              <h1 style={{ color: "#e63946", fontWeight: "bold" }}>Pizza Time</h1>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Join the family and start selling delicious pizzas!
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
                className="img-fluid"
                style={{ width: "300px", height: "300px", margin: "20px 0" }}
                alt="Pizza illustration"
              />
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
    </div>
  );
}

export default Login;
