package com.pack.trainBookings.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "trains")
public class Trains {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "train_id")
    private int train_id;
    @Column(name = "train_no")
    private String train_no;
    @Column(name = "train_name")
    private String train_name;
    @Column(name = "from_source")
    private String from_source;
    @Column(name = "to_destination")
    private String to_destination;
    @Column(name = "departure_date")
    private LocalDate departure_date;
    @Column(name = "arrival_date")
    private LocalDate arrival_date;
    @Column(name = "departure_time")
    private LocalTime departure_time;
    @Column(name = "arrival_time")
    private LocalTime arrival_time;
    @Column(name = "total_seats")
    private int total_seats;
    @Column(name = "available_seats")
    private int available_seats;
    @Column(name = "amount_per_seat")
    private double amount_per_seat;
    @Column(name= "train_status")
    private String train_status;

//    @Transient
    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL)
    private List<Booking> bookings;

}
