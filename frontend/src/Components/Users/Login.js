import React, { useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

const Login = () => {
  // akshay003@gmail.com
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-primary">
      <div
        className="card p-4"
        style={{ width: "20rem", borderRadius: "1rem" }}
      >
        <div className="text-center">
          <h3
            className="mb-4 btn btn-primary"
            style={{ width: "40%", height: "45px" }}
          >
            SIGN IN
          </h3>
          <div className="mb-4">
            <FaUserCircle size={100} color="white" />
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label Remember" htmlFor="rememberMe">
                <small>Remember me</small>
              </label>
            </div>
            <Link href="/" className="text-decoration-none Remember">
              <small>Forgot your password?</small>
            </Link>
          </div>
          <button
            // type="submit"
            className="btn btn-primary w-100"
            // onClick={login}
          >
            {/* {loading ? "Logging in..." : "LOGIN"} */}
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
