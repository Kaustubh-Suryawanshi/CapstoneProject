package com.logins.UsersInfo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
    private int id;
    private String train_no;
    private String train_name;
    private String passenger_name;
    private int passenger_age;
    private String passenger_gender;
    private LocalDateTime booking_date;
    private LocalDate departure_date;
    private LocalTime departure_time;
}
