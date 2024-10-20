import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/loginpage.css";
import "../styles/Navbar.css";
import { UserContext } from "../Context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("passenger");
  const { updateUserId, updateUserName, updateUserRole } =
    useContext(UserContext);
  const nav = useNavigate(); // To navigate between routes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
        role,
      });
      console.log(response.data);
      if (response.data != "") {
        updateUserId(response.data.user_id);
        updateUserName(response.data.fname);
        updateUserRole(response.data.user_role);
        console.log(response.data);
        nav("/search")
      } else {
        console.log(response.data);
        toast.error("Invlid Credentials");
        nav("/login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label>Login As:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="passenger">Passenger</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div
          style={{ display: "flex", alignItems: "space-between", marginTop: "3px" }}
        >
          <span>Don't have an account?</span><Link to={"/signup"}>Sign Up</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
