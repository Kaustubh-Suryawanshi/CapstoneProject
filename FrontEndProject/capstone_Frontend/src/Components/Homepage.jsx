import React from "react";
import '../styles/Homepage.css'
import logo from '../image/logo.jfif'

const Homepage = () => {
  return (
    <>
      <main>
        <div className="intro">
          <h1>Spartan Trains</h1>
          <p>Welcome to our Train Booking System</p>
        </div>
        <div className="about-me">
          <div className="about-me-text">
            <h2>Why NobelTrains</h2>
            <p>
              Spartan Trains offers a seamless experience for booking train tickets across India. 
              With thousands of routes and a user-friendly platform, we make train journeys 
              more accessible for everyone. Our system is trusted by millions for its reliability, 
              safety, and convenience, ensuring that passengers can book tickets with ease and 
              comfort. Enjoy special discounts, real-time tracking, and 24/7 customer support to 
              make your travel plans smooth and hassle-free.
            </p>
          </div>
          <img src={logo} alt="Nobel Trains Logo" />
        </div>
      </main>
    </>
  );
};

export default Homepage;
