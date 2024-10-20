package com.logins.UsersInfo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;
    @Column(name = "first_name")
    private String fname;
    @Column(name = "last_name")
    private String lname;
    @Column(name = "email" , unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "phone")
    private String phone;
    @Column(name = "user_role" , nullable = false)
    private String  user_role="passenger";


}
