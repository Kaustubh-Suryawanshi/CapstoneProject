package com.pack.trainBookings.response;

import com.pack.trainBookings.entity.Passenger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PassengerDTO {
    private int passenger_id;
    private String passenger_name;
    private int passenger_age;
    private String passenger_gender;

    public static PassengerDTO maptoPassengerDTO(Passenger passenger) {
        PassengerDTO passengerDTO=new PassengerDTO();
        passengerDTO.setPassenger_id(passenger.getPassenger_id());
        passengerDTO.setPassenger_name(passenger.getPassenger_name());
        passengerDTO.setPassenger_age(passenger.getPassenger_age());
        passengerDTO.setPassenger_gender(passenger.getPassenger_gender());

        return  passengerDTO;
    }
}
