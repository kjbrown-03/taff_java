package com.hotelmanagement.dto;

import com.hotelmanagement.model.enums.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ServiceBookingDto {
    private Long id;
    private Long serviceId;
    private String serviceName;
    private Long reservationId;
    private LocalDateTime bookingDate;
    private BookingStatus status;
    private Integer quantity;
    private BigDecimal totalPrice;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}