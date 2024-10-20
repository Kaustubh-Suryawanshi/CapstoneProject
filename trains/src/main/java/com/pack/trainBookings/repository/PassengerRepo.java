package com.pack.trainBookings.repository;

import com.pack.trainBookings.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepo extends JpaRepository<Passenger, Integer> {
}
