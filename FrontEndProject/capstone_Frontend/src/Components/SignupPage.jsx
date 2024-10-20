import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Signup.css";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/register", formData).then((data) => {
      if (data.data != "") {
        nav("/login");
      } else {
        toast.error("email already registered");
        nav("/signup");
      }
    });
  };
  return (
    <>
    <h2>Enter your Details</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
            placeholder="Enter last name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter Phone No."
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <div style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
          <p>Already have an account?</p>
          <button
            onClick={() => {
              nav("/login");
            }}
            style={{marginLeft:"3px",backgroundColor: "#37516d",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer", borderRadius:"3px"}}
          >
            Log in
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default SignupPage;
