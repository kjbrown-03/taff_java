package com.hotelmanagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String roleName;
    private Boolean enabled;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}