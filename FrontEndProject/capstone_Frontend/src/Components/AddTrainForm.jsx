import React, { useContext } from "react";
import { TrainContext } from "../Context/TrainContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Addtrain.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const AddTrainForm = () => {
  const [formData, setFormData] = useState({
    train_no: "",
    train_name: "",
    from_source: "",
    to_destination: "",
    departure_date: "",
    arrival_date: "",
    departure_time: "",
    arrival_time: "",
    total_seats: "",
    available_seats: "",
    amount_per_seat: "",
  });

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

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { setTrains } = useContext(TrainContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.total_seats < formData.available_seats) {
      toast.error("total_seats should be greater than available seats");
      return;
    }
    // You can handle API calls or form submission logic here
    axios.post("http://localhost:8081/admin/add", formData).then((response) => {
      console.log(response.data);
      setTrains(response.data);
      // msg that train is added
      console.log("train added");
      nav("/admin/getTrains");
    });
  };

  return (
    <div className="form-container">
      <h3 className="form-heading">Enter Train Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Train number:</label>
          <input
            className="form-input"
            type="number"
            name="train_no"
            value={formData.train_no}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Train Name:</label>
          <input
            className="form-input"
            type="text"
            name="train_name"
            value={formData.train_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">From:</label>
          <input
            className="form-input"
            type="text"
            name="from_source"
            value={formData.from_source}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">To:</label>
          <input
            className="form-input"
            type="text"
            name="to_destination"
            value={formData.to_destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Departure date:</label>
          <input
            className="form-input"
            type="date"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            required
            min={minDate}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Departure time:</label>
          <input
            className="form-input"
            type="time"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Arrival date:</label>
          <input
            className="form-input"
            type="date"
            name="arrival_date"
            value={formData.arrival_date}
            onChange={handleChange}
            required
            min={minDate}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Arrival time:</label>
          <input
            className="form-input"
            type="time"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total seats:</label>
          <input
            className="form-input"
            type="number"
            name="total_seats"
            value={formData.total_seats}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Available seats:</label>
          <input
            className="form-input"
            type="number"
            name="available_seats"
            value={formData.available_seats}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            className="form-input"
            type="number"
            name="amount_per_seat"
            value={formData.amount_per_seat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button className="form-button" onClick={()=>{nav("/search")}}>Back</button>
          <button className="form-button" type="submit">
            Submit
          </button>
         
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTrainForm;
