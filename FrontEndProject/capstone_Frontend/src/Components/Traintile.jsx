import React, { useContext } from "react";
import "../styles/Traintile.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../styles/AdminTrainTile.css";
import axios from "axios";


const TrainTile = ({ train,updateTrains }) => {
  const calculateJourneyTime = () => {
    const departure = new Date(`1970-01-01T${train.departure_time}`);
    const arrival = new Date(`1970-01-01T${train.arrival_time}`);
    const diff = new Date(arrival - departure);

    const hours = diff.getUTCHours();
    const minutes = diff.getUTCMinutes();
    return `${hours}h ${minutes}m`;
  };
  const nav = useNavigate();
  const { userID, role } = useContext(UserContext);


  const fetchTrainsAfterDeletion=()=>{
    axios.post(`http://localhost:8081/admin/delete/${train.train_id}`)
    .then((res)=>{
        updateTrains(res);
    }).catch((console.error))
  }

  

  const deleteHanlder=(e)=>{
    e.preventDefault();
    if(userID!=0)
    fetchTrainsAfterDeletion();
  else nav("/login");
  }

  const updateHandler=(e)=>{
    e.preventDefault();
    if(userID !=0)
    nav(`/admin/updatetrain/${train.train_id}`)
  else nav("/login")
  }
  return (
    <div className="train-tile">
      {/* Top Section - Train No and Name */}
      <div className="train-header">
        <h3>
          {train.train_no} - {train.train_name}
        </h3>
      </div>

      {/* Middle Section - Source, Destination, and Journey Time */}
      <div className="train-details">
        <div className="train-source">
          <p>
            <strong>From:</strong> {train.from_source}
          </p>
          <p>
            <strong>Departure:</strong> {train.departure_date} at{" "}
            {train.departure_time}
          </p>
        </div>

        <div className="train-journey-time">
          <p>
            <strong>-Time of Journey-</strong>
          </p>
          <p>
            <strong>{calculateJourneyTime()}</strong>
          </p>
        </div>

        <div className="train-destination">
          <p>
            <strong>To:</strong> {train.to_destination}
          </p>
          <p>
            <strong>Arrival:</strong> {train.arrival_date} at{" "}
            {train.arrival_time}
          </p>
        </div>
      </div>

      {/* Bottom Section - Available Seats, Amount, and Book Button */}
      <div className="train-footer">
        {role==='admin'&&( <div className="train-seats">
          <p>
            <strong>Total Seats:</strong> {train.total_seats}
          </p>
          <p>
            <strong>Available Seats:</strong> {train.available_seats}
          </p>
        </div>)}
        {role==='passenger' &&( <div className="train-seats">
          <p>
            <strong>Available Seats:</strong> {train.available_seats}
          </p>
        </div>)}
       

        <div className="train-amount">
          <p>
            <strong>Amount per Seat:</strong> ₹
            {train.amount_per_seat.toFixed(2)}
          </p>
        </div>

        <div className="train-book">
          {userID != 0 && role === "passenger" && (
            <button
              className="book-button"
              onClick={(e) => {
                nav(`/user/addBooking/${train.train_id}`);
              }}
            >
              Book Tickets
            </button>
          )}
          {userID != 0 && role === "admin" && (
            <>
              <div className="train-update">
                <button className="update-button" onClick={updateHandler}>
                  update Train
                </button>
              </div>
              <div className="train-delete">
                <button className="delete-button" onClick={deleteHanlder}>
                  Delete Train
                </button>
              </div>
            </>
          )}
           {userID == 0 &&(<button
              className="book-button"
              onClick={(e) => {
                nav(`/login`);
              }}
            >
              Login
            </button>)}
        </div>
      </div>
    </div>
  );
};

export default TrainTile;
