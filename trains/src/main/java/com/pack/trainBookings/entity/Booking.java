package com.pack.trainBookings.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int booking_id;
    @Column(name = "user_id")
    private int user_id;
    @Column(name= "booking_date" )
    private LocalDateTime booking_date;

    @ManyToOne
    @JoinColumn(name = "train_id")// Foreign key column
    private Trains train;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Passenger> passengers=new ArrayList<>();

    public void addPassenger(Passenger passenger) {
        passengers.add(passenger);
        passenger.setBooking(this); // Set the booking reference in Passenger
    }
}
