package com.pack.trainBookings.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainResponse {
    private int train_id;
    private String train_no;
    private String train_name;
    private String from_source;
    private String to_destination;
    private LocalDate departure_date;
    private LocalDate arrival_date;
    private LocalTime departure_time;
    private LocalTime arrival_time;
    private int total_seats;
    private int available_seats;
    private double amount_per_seat;
    private String train_status;



}

