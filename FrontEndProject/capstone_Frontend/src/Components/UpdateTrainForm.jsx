import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrainContext } from "../Context/TrainContext";
import '../styles/Updateform.css'; // Import your CSS file
import { toast, ToastContainer } from "react-toastify";

const UpdateTrainForm = () => {
  const { setTrains } = useContext(TrainContext);
  const { tid } = useParams();
  const [formData, setFormData] = useState({
    train_no: "",
    train_name: "",
    from_source: "",
    to_destination: "",
    departure_date: "",
    arrival_date: "",
    departure_time: "",
    arrival_time: "",
    total_seats: 0,
    available_seats: 0,
    amount_per_seat: 0,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    // Set today's date as the minimum date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = today.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/trains/search/trainbyid/${tid}`)
      .then((response) => {
        const trainData = response.data;
        setFormData({
          train_no: trainData.train_no,
          train_name: trainData.train_name,
          from_source: trainData.from_source,
          to_destination: trainData.to_destination,
          departure_date: trainData.departure_date,
          arrival_date: trainData.arrival_date,
          departure_time: trainData.departure_time,
          arrival_time: trainData.arrival_time,
          total_seats: trainData.total_seats,
          available_seats: trainData.available_seats,
          amount_per_seat: trainData.amount_per_seat,
        });
      })
      .catch(console.error);
  }, [tid]);

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.total_seats < formData.available_seats) {
      toast.error("total_seats should be greater than available seats");
      return;
    }
    if(formData.departure_date> formData.arrival_date){
      toast.error("departure date should be earlier than arrival date");
      return;
    }
    axios
      .patch(`http://localhost:8081/admin/update/${tid}`, formData)
      .then((res) => {
        setTrains(res.data);
        nav("/search");
      })
      .catch(console.error);
     
  };

  return (
    <div className="update-train-form">
      <h3>Update Train Details</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Train number:</label>
          <input
            type="text"
            name="train_no"
            value={formData.train_no}
            onChange={handleChange}
            required
            disabled
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Train Name:</label>
          <input
            type="text"
            name="train_name"
            value={formData.train_name}
            onChange={handleChange}
            required
            disabled
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>From:</label>
          <input
            type="text"
            name="from_source"
            value={formData.from_source}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>To:</label>
          <input
            type="text"
            name="to_destination"
            value={formData.to_destination}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Departure date:</label>
          <input
            type="date"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            required
            min={minDate}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Departure time:</label>
          <input
            type="time"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            required
            
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Arrival date:</label>
          <input
            type="date"
            name="arrival_date"
            value={formData.arrival_date}
            onChange={handleChange}
            required
            min={minDate}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Arrival time:</label>
          <input
            type="time"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Total seats:</label>
          <input
            type="number"
            name="total_seats"
            value={formData.total_seats}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Available seats:</label>
          <input
            type="number"
            name="available_seats"
            value={formData.available_seats}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount_per_seat"
            value={formData.amount_per_seat}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-buttons">
          <button className="form-button" onClick={()=>{nav("/trains")}}>Back</button>
          <button className="form-button" type="submit" disabled={!isDirty}>
            Update
          </button>
         
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default UpdateTrainForm;
