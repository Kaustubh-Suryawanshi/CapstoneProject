import React, { useState } from 'react';
import '../styles/BookingDetailsTile.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardActions, Button } from '@mui/material';

const BookindDetailsTile = ({ booking, onCancel }) => {
    const formattedBookingDate = new Date(booking.booking_date).toLocaleDateString();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleCancelBooking = () => {
        axios.post(`http://localhost:8081/booking/cancel/${booking.id}`)
            .then(() => {
                onCancel(); // Trigger refresh in BookingDetails
            })
            .catch(err => console.error(err));
    };

    const handleCancelTicket = (pid) => {
        // Call the API to cancel the specific passenger's ticket
        axios.post(`http://localhost:8081/booking/${booking.id}/passenger/cancel/${pid}`)
            .then((res) => {
                console.log(res.data);
                // After successfully canceling the passenger ticket, close the modal
                handleClose();
    
                // Check if any passengers remain in the booking
                const remainingPassengers = booking.passengerList.filter(
                    passenger => passenger.passenger_id !== pid
                );
    
                if (remainingPassengers.length === 0) {
                    // If no passengers remain, delete the entire booking
                    handleCancelBooking();
                } else {
                    // Update the booking context or trigger a refresh by calling onCancel
                    onCancel(); // Refresh the booking details
                }
            })
            .catch(err => console.error(err));
    };
    

    return (
        <div className="booking-tile">
            <div className="booking-header">
                <h3>{booking.train_no} - {booking.train_name}</h3>
            </div>
            <div className="booking-info">
                <div className="left-info">
                    <p><strong>Booking Date:</strong> {formattedBookingDate}</p>
                    <p><strong>Departure Date:</strong> {booking.departure_date}</p>
                    <p><strong>Departure Time:</strong> {booking.departure_time}</p>
                    <p><strong>No. of Seats Booked:</strong> {booking.no_of_bookings}</p>
                </div>
                <div className="right-info">
                    <div className="booking-actions">
                        <button className="download-button">Download Ticket</button>
                        <button className="view-button" onClick={handleOpen}>View Booking Details</button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style, overflowY: 'auto', maxHeight: '80vh' }} className="modal-content">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Passenger Details
                                </Typography>

                                {booking.passengerList.map((passenger, index) => (
                                    <Card key={index} sx={{ mt: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                Passenger
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Name: </strong>{passenger.passenger_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Age: </strong>{passenger.passenger_age}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Gender: </strong>{passenger.passenger_gender}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleCancelTicket(passenger.passenger_id)}>
                                                Cancel Ticket
                                            </Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        </Modal>

                        <button className="cancel-button" onClick={handleCancelBooking}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookindDetailsTile;
