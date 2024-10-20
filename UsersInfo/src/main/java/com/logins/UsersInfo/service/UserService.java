package com.logins.UsersInfo.service;

import com.logins.UsersInfo.entity.User;
import com.logins.UsersInfo.repository.UserRepo;
import com.logins.UsersInfo.response.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private WebClient webClient;


    /*public List<UserResponse> getAllusers(){
        UserResponse userResponse;
        List<User> allusers= userRepo.findAll();
        List<UserResponse> userResponses=new ArrayList<>();
        for(Object it:allusers){
             userResponse=modelMapper.map(it, UserResponse.class) ;
             userResponses.add(userResponse);
        }
        return userResponses;
    }*/

    public UserResponse addUserDetails(User user){
        User userRes;
        if(userRepo.findByEmail(user.getEmail()) != null){
            return null;
        }
        userRes= userRepo.save(user);
        return modelMapper.map(userRes, UserResponse.class);
    }

    public UserResponse getSingleuserById(int id){
        User user  = userRepo.findById(id).get();
        return modelMapper.map(user,UserResponse.class);
    }




    public UserResponse authenthenticateUser(LogInDTO logInDTO) {
        User user=userRepo.findByEmail(logInDTO.getEmail());
        if(user!=null &&
                user.getPassword().equals(logInDTO.getPassword())
                && user.getUser_role().equals(logInDTO.getRole())){
            return modelMapper.map(user, UserResponse.class);
        }
        return null;

    }

    /*public UserResponseWithBooking getBookingDetailsByUserId(int user_id){
        Mono<List<BookingResponse>> bookingResponseList;
        UserResponseWithBooking userResponseWithBooking=new UserResponseWithBooking();
        userResponseWithBooking.setUser_id(user_id);
        bookingResponseList= webClient.get()
                .uri("/booking/search/"+user_id) // Adjust the endpoint as necessary
                .retrieve()
                .bodyToFlux(BookingResponse.class)
                .collectList();
        userResponseWithBooking.setBookingResponseList(bookingResponseList);
        return userResponseWithBooking;
    }*/

    public BookingResponse addBookingDetails(int userId, BookingDTO bookingDTO) {
        bookingDTO.setUser_id(userId);
        return webClient.post().uri("/booking/addBooking")
                .bodyValue(bookingDTO)
                .retrieve()
                .bodyToMono(BookingResponse.class).block();

    }
}
