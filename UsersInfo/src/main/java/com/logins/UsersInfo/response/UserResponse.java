package com.logins.UsersInfo.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponse {

    private int user_id;
    private String fname;
    private String lname;
    private String email;
    private String password;
    private String phone;
    private String user_role;


}
