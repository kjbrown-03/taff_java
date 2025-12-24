package com.hotelmanagement.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class GuestDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String country;
    private String postalCode;
    private String documentType;
    private String documentNumber;
    private LocalDate dateOfBirth;
    private String preferences;
    private String nationality;
    private Boolean isVip;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}