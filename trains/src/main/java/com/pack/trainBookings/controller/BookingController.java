package com.pack.trainBookings.controller;


import com.pack.trainBookings.entity.Booking;
import com.pack.trainBookings.entity.Passenger;
import com.pack.trainBookings.entity.Trains;
import com.pack.trainBookings.response.BookingDTO;
import com.pack.trainBookings.response.BookingResponse;
import com.pack.trainBookings.service.BookingService;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
    @Autowired
    BookingService bookingService;

//    add booking details when user books Ticket
    @PostMapping("/addBooking")
    public BookingResponse addBooking(@RequestBody BookingDTO bookingDTO){
        Booking booking=new Booking();
//        booking.setPassengers(bookingDTO.getPassengerList());
        booking.setBooking_date(LocalDateTime.now());
        booking.setUser_id(bookingDTO.getUser_id());
        int train_id=bookingDTO.getTrain_id();

        List<Passenger> passengers = bookingDTO.getPassengerList().stream()
                .map(dto -> new Passenger(dto.getPassenger_name(), dto.getPassenger_age(), dto.getPassenger_gender()))
                .collect(Collectors.toList());
        return bookingService.addBookingDetails(train_id,booking,passengers);
    }

//    show booking details using booking_id (no use)
    /*@GetMapping("/getbookings")
    public ResponseEntity<Optional<Booking>> getBookingDetails(@RequestParam int booking_id){
        return ResponseEntity.ok(bookingService.getBookingDetails(booking_id));
    }*/

//    show bookings using user_id
    @GetMapping("/get/{user_id}")
    public ResponseEntity<List<BookingResponse>> getBookingDetailsByUserId(@PathVariable int user_id){
        List<BookingResponse> bookingResponseList=bookingService.getBookingDetailsByUserId(user_id);
        return ResponseEntity.ok(bookingResponseList);
    }

//    @GetMapping("/get/trainname")

//  cancel booking
    @PostMapping("/cancel/{booking_id}")
    public void cancelTheBooking(@PathVariable int booking_id){
        bookingService.cancelTheBooking(booking_id);
    }

//    cancel passenger ticket
    @PostMapping("{booking_id}/passenger/cancel/{passenger_id}")
    public ResponseEntity<String> cancelThePassenger(@PathVariable int booking_id, @PathVariable int passenger_id){
        try {
            bookingService.cancelThePassenger(booking_id,passenger_id);
           return ResponseEntity.status(HttpStatus.OK).body("deletion successfull");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }


//    optional...
//    show booking details of particular train(for admin)
//    show booking details base on the train_name

}
