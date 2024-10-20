import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const nav = useNavigate();
  const { userName, updateUserName } = useContext(UserContext);
  const { role, updateUserId } = useContext(UserContext);
  const handleLogout = () => {
    updateUserName("");
    updateUserId(0);
    nav("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h3>Welcome to NobelTrains {userName}</h3>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
        {role === "passenger" && (
          <Link to="/user/getbookings" className="nav-link">
            My Bookings
          </Link>
        )}
        {role === "admin" && (
          <Link to="/admin/getTrains" className="nav-link">
            Get all trains
          </Link>
        )}

        {userName === "" && (
          <><Link to="/login" className="nav-link">
            Login
          </Link><Link to="/signup" className="nav-link">
              Register
            </Link></>
        )}
        {userName !== "" && (
          <>
            <Link to="/Profile" className="nav-link">
              My Profile
            </Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">
              Logout
            </Link>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
