import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BookingDetailsContext } from "../Context/BookingDetailsContext";
import { UserContext } from "../Context/UserContext";
import BookindDetailsTile from "./BookindDetailsTile";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const { bookings, setBookings } = useContext(BookingDetailsContext);
  const { userID } = useContext(UserContext);

  const fetchBookings = () => {
    axios
      .get(`http://localhost:8081/booking/get/${userID}`)
      .then((response) => {
        setBookings(response.data);
        console.log(response.data)
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = () => {
    fetchBookings();
  };

  const nav = useNavigate();

  const addbookingstyle = {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s"
  };

  return (
    <div>
      {userID!=0 &&(
        <div
        className="addbook-button"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="search" style={{ marginRight: "10px", fontSize: "16px" }}>Search Bookings: </label>
        <input type="text" name="search" placeholder="search" style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        marginRight: "20px"
      }}/> 
        </div>
       
        <button
          onClick={() => {
            nav("/search");
          }}
          style={addbookingstyle}
        >
          New Booking
        </button>
      </div>
      )}
      <div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookindDetailsTile
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p>No Bookings found for the selected user.</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
