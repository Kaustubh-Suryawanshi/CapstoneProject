package com.logins.UsersInfo.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class UserConfig {

//    @Value("${addressservice.base.url}")
//    private String addressBaseUrl;

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public WebClient webClient() {
        return  WebClient.builder().baseUrl("http://localhost:8081").build();
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer(){
//       return new WebMvcConfigurer() {
//           @Override
//           public void addCorsMappings(CorsRegistry registry) {
//               registry.addMapping("/**").allowedOrigins("*");
//           }
//       };
//    }



}
