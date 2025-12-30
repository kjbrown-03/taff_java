package com.hotelmanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "timesheets")
@Data
@EqualsAndHashCode(callSuper = true)
public class Timesheet extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(name = "check_in_time")
    private LocalTime checkInTime;
    
    @Column(name = "check_out_time")
    private LocalTime checkOutTime;
    
    @Column(name = "hours_worked")
    private Double hoursWorked;
    
    // createdAt and updatedAt are inherited from BaseEntity (auditing)
    // Remove duplicate fields to avoid conflicts
 }
