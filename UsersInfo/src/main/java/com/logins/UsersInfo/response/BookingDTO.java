package com.logins.UsersInfo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
