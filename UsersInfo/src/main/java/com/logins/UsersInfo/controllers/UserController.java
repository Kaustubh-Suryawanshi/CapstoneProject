package com.logins.UsersInfo.controllers;

import com.logins.UsersInfo.response.BookingDTO;
import com.logins.UsersInfo.response.BookingResponse;
//import com.logins.UsersInfo.response.UserResponseWithBooking;
import com.logins.UsersInfo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/booking/add/{user_id}")
    public String addBookingDetails(@PathVariable int user_id,@RequestBody BookingDTO bookingDTO){
        if(userService.addBookingDetails(user_id,bookingDTO)!=null){
            return "booking added";
        }
        return "not added";

    }


}
