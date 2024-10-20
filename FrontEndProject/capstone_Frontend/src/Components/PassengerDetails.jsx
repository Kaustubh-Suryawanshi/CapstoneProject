import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/passenger.css';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const PassengerDetails = () => {
    const { userID } = useContext(UserContext);
    const { tid } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [total,setTotal]=useState(0);
    const [seats,setSeats]=useState(0);

    useEffect(()=>{
        fetchTrainDetails();
    },[])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [passengerDetails, setPassengerDetails] = useState({
        passenger_name: '',
        passenger_age: '',
        passenger_gender: '',
    });

    const [passengerList, setPassengerList] = useState([]);

    const nav = useNavigate();

    const handleChange = (e) => {
        setPassengerDetails({
            ...passengerDetails,
            [e.target.name]: e.target.value,
        });
    };

    const addPassenger = (e) => {
        e.preventDefault();

        if (!passengerDetails.passenger_gender) {
            toast.warn('Please select gender.');
            return;
        }
        if (passengerList.length >= 4) {
            toast.warn('Maximum 4 passengers at a time!');
            return;
        }
        if (passengerList.length >= seats) {
            toast.warn('Cannot add more passengers train is full!');
            return;
        }


        setPassengerList([...passengerList, passengerDetails]);

        setPassengerDetails({
            passenger_name: '',
            passenger_age: '',
            passenger_gender: '',
        });
    };

    const removePassenger = (index) => {
        const updatedList = passengerList.filter((_, i) => i !== index);
        setPassengerList(updatedList);
    };

    const fetchTrainDetails=()=>{
        axios.get(`http://localhost:8081/trains/search/trainbyid/${tid}`)
        .then(response => {
            setTotal(response.data.amount_per_seat)
            setSeats(response.data.available_seats);
        })
        .catch(error => {
            console.error('Error booking tickets:', error);
        });
    }

    const handlepay = (e) => {
        e.preventDefault();
        if (passengerList.length === 0) {
            alert('Please add at least one passenger before booking.');
            return;
        }

        const bookingDTO = {
            passengerList: passengerList,
            train_id: parseInt(tid),
        };

        axios.post(`http://localhost:8080/user/booking/add/${userID}`, bookingDTO)
            .then(response => {
                console.log(response.data);
                nav('/user/getbookings');
            })
            .catch(error => {
                console.error('Error booking tickets:', error);
            });
            handleClose();
    };

    

    return (
        <div className="passenger-details-container">
            <div className="form-section">
                <h2>Enter Passenger Details</h2>
                <form onSubmit={addPassenger}>
                    <input
                        type="text"
                        name="passenger_name"
                        placeholder="Name"
                        value={passengerDetails.passenger_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="passenger_age"
                        placeholder="Age"
                        value={passengerDetails.passenger_age}
                        onChange={handleChange}
                        required
                    />
                    <div className="gender-options">
                        <label>
                            <input
                                type="radio"
                                name="passenger_gender"
                                value="male"
                                checked={passengerDetails.passenger_gender === 'male'}
                                onChange={handleChange}
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="passenger_gender"
                                value="female"
                                checked={passengerDetails.passenger_gender === 'female'}
                                onChange={handleChange}
                            /> Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="passenger_gender"
                                value="other"
                                checked={passengerDetails.passenger_gender === 'other'}
                                onChange={handleChange}
                            /> Other
                        </label>
                    </div>
                    <div className="action-buttons">
                        <button type="submit" className="add-passenger-button">Add Passenger</button>
                    </div>
                </form>
            </div>

            <div className="passenger-list-section">
                <h3>Passenger List</h3>
                {passengerList.length === 0 ? (
                    <p>No passengers added yet.</p>
                ) : (
                    <ul>
                        {passengerList.map((passenger, index) => (
                            <li key={index}>
                                <span>{passenger.passenger_name} - {passenger.passenger_age} years - {passenger.passenger_gender}</span>
                                <button onClick={() => removePassenger(index)} className="remove-passenger-button">X</button>
                            </li>
                        ))}
                    </ul>
                )}

                {passengerList.length > 0 && (
                    <div className="final-action-buttons">
                        <button className="book-tickets-button" onClick={handleOpen}>Book Tickets</button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className="modal-content">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Passenger Details
                                </Typography>
                                <Button
                                    size="medium"
                                    color="success"
                                    style={{alignSelf:"center"}}
                                    onClick={handlepay}>
                                    Pay {total*passengerList.length}
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default PassengerDetails;
