package com.logins.UsersInfo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogInDTO {
    private String email;
    private String password;
    private String role;
}
