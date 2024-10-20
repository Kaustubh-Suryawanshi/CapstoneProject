package com.pack.trainBookings.service;

import com.pack.trainBookings.entity.Booking;
import com.pack.trainBookings.entity.Passenger;
import com.pack.trainBookings.entity.Trains;
import com.pack.trainBookings.repository.BookingRepo;
import com.pack.trainBookings.repository.PassengerRepo;
import com.pack.trainBookings.repository.TrainRepo;
import com.pack.trainBookings.response.BookingResponse;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private TrainRepo trainRepo;

    @Autowired
    private PassengerRepo passengerRepo;

    public BookingResponse addBookingDetails(int train_id,Booking booking,List<Passenger> passengerList) {
        Optional<Trains> managedTrain = trainRepo.findById(train_id);

        managedTrain.get().setAvailable_seats(managedTrain.get().getAvailable_seats()- passengerList.size());
        booking.setTrain(managedTrain.orElse(null));
        for(Passenger p: passengerList){
           booking.addPassenger(p);
        }
        return BookingResponse.MapToBookingResponse(bookingRepo.save(booking));
    }

    public Optional<Booking> getBookingDetails(int booking_id) {
        Optional<Booking> booking =bookingRepo.findById(booking_id);
        return booking;
    }

    public List<BookingResponse> getBookingDetailsByUserId(int user_id) {
        List<Booking> bookings =bookingRepo.getBookingDetailsByUserId(user_id);
        List<BookingResponse> bookingResponseList=new ArrayList<>();
        for(Booking b:bookings){
            if(!b.getPassengers().isEmpty()){
                bookingResponseList.add(BookingResponse.MapToBookingResponse(b));
            }
        }
        return bookingResponseList;
    }

    public void cancelTheBooking(int bookingId) {
        Optional<Booking> bookingOptional =bookingRepo.findById(bookingId);
        if(bookingOptional.isPresent()) {
            Booking  booking=bookingOptional.get();
            Trains train =booking.getTrain();
            train.setAvailable_seats(train.getAvailable_seats()+booking.getPassengers().size());
            bookingRepo.deleteById(bookingId);
        }
    }

    public void cancelThePassenger(int bookingId, int passengerId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        // Fetch the passenger by ID and ensure it belongs to the booking
        Passenger passenger = passengerRepo.findById(passengerId)
                .orElseThrow(() -> new RuntimeException("Passenger not found with id: " + passengerId));

        if (passenger.getBooking().getBooking_id()!= bookingId) {
            throw new RuntimeException("Passenger does not belong to this booking");
        }
        Trains train=booking.getTrain();
       train.setAvailable_seats(train.getAvailable_seats()+1);
        booking.getPassengers().remove(passenger);
        passengerRepo.delete(passenger); // Delete the passenger

        // Save the updated booking without the removed passenger
        if(!booking.getPassengers().isEmpty())
        bookingRepo.save(booking);
        else bookingRepo.delete(booking);
    }
}
