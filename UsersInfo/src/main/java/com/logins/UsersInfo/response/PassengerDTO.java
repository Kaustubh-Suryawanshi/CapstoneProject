package com.logins.UsersInfo.response;

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
}
