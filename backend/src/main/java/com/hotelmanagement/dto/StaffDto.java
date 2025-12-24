package com.hotelmanagement.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class StaffDto {
    private Long id;
    private Long userId;
    private String username;
    private String employeeId;
    private Long departmentId;
    private String departmentName;
    private String position;
    private BigDecimal salary;
    private LocalDate hireDate;
    private Boolean isActive;
    private String emergencyContact;
    private String emergencyPhone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}