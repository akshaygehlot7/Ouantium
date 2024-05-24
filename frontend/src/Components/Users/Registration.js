import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // const items = { name, email, password, dateofBirth };
    e.preventDefault();
    const item = { email, name, password, dateofBirth };
    console.log(item);
    try {
      const result = await axios.post("/api/users/register", item);
      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Accept": "application/json",
      //   },
      //   body: JSON.stringify(item),
      // };
      result = await result.json;
      console.log(result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      navigate("/");
    } catch (error) {
      console.log(error);
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
            SIGN UP
          </h3>
          <div className="mb-4">
            {/* <img
            src="https://via.placeholder.com/80"
            alt="User Icon"
            className="img-fluid rounded-circle"
          /> */}
            <FaUserCircle size={100} color="white" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Year-MM-Days"
              onChange={(e) => setdateofBirth(e.target.value)}
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
          {/* <button type="submit" className="btn btn-primary w-100">
          SIGN UP
        </button> */}
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </div>
  );
};

export default Registration;
