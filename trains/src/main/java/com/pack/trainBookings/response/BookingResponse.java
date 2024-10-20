package com.pack.trainBookings.response;

import com.pack.trainBookings.entity.Booking;
import com.pack.trainBookings.entity.Passenger;
import com.pack.trainBookings.entity.Trains;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
    private int id;
    private String train_no;
    private String train_name;
    private LocalDateTime booking_date;
    private LocalDate departure_date;
    private LocalTime departure_time;
    private int no_of_bookings;
    private List<PassengerDTO> passengerList;




    public static BookingResponse MapToBookingResponse(Booking booking){
        BookingResponse bookingResponse= new BookingResponse();
        bookingResponse.setId(booking.getBooking_id());
        bookingResponse.setBooking_date(booking.getBooking_date());
        bookingResponse.setTrain_no(booking.getTrain().getTrain_no());
        bookingResponse.setTrain_name(booking.getTrain().getTrain_name());
        bookingResponse.setDeparture_date(booking.getTrain().getDeparture_date());
        bookingResponse.setDeparture_time(booking.getTrain().getDeparture_time());
        bookingResponse.setNo_of_bookings(booking.getPassengers().size());
        bookingResponse.setPassengerList(booking.getPassengers().stream()
                .map(PassengerDTO::maptoPassengerDTO).
                collect(Collectors.toList()));
        return bookingResponse;
    }
}
