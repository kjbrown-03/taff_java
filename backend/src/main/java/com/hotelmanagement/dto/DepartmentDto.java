package com.hotelmanagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DepartmentDto {
    private Long id;
    private String name;
    private String description;
    private Long managerId;
    private String managerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}