package com.pack.trainBookings.response;

import com.pack.trainBookings.entity.Passenger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDTO {
    private int id;
    private int user_id;
    private LocalDateTime booking_date;
    private int train_id;
    private List<PassengerDTO> passengerList;
}
