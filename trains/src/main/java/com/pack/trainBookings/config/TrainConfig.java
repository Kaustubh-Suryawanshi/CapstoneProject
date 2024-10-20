package com.pack.trainBookings.config;


import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TrainConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
