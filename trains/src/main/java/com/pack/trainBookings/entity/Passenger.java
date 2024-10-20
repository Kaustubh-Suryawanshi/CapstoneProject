package com.pack.trainBookings.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "passengers")
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "passenger_id")
    private int passenger_id;
    @Column(name = "passenger_name")
    private String passenger_name;
    @Column(name = "passenger_age")
    private int passenger_age;
    @Column(name = "passenger_gender")
    private String passenger_gender;
    @ManyToOne
    @JoinColumn(name = "booking_id")// Foreign key column
    private Booking booking;

    public Passenger(String  passenger_name, int passenger_age, String passenger_gender) {
        this.passenger_name = passenger_name;
        this.passenger_age = passenger_age;
        this.passenger_gender = passenger_gender;
    }
}
