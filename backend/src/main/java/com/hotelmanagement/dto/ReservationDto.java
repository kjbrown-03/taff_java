package com.hotelmanagement.dto;

import com.hotelmanagement.model.enums.ReservationStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReservationDto {
    private Long id;
    private String reservationNumber;
    private Long guestId;
    private String guestName;
    private Long roomId;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfGuests;
    private ReservationStatus status;
    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private String specialRequests;
    private LocalDate actualCheckInDate;
    private LocalDate actualCheckOutDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}