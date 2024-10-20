package com.pack.trainBookings.repository;

import com.pack.trainBookings.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking,Integer> {
    @Query("Select b from Booking b where b.user_id=:user_id")
    List<Booking> getBookingDetailsByUserId(@Param("user_id") int user_id);

}
