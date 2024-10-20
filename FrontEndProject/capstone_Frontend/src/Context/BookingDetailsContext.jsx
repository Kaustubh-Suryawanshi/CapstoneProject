import React, { createContext, useState } from 'react';

export const BookingDetailsContext = createContext();

export const BookingDetailsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);


    return (
        <BookingDetailsContext.Provider value={{ bookings, setBookings }}>
            {children}
        </BookingDetailsContext.Provider>
    );
};
