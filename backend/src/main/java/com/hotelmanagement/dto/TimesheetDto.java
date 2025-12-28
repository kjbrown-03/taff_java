package com.hotelmanagement.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class TimesheetDto {
    private Long id;
    private Long staffId;
    private String staffName;
    private LocalDate date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private Double hoursWorked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}