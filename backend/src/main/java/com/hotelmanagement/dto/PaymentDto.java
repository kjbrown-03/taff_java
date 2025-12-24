package com.hotelmanagement.dto;

import com.hotelmanagement.model.enums.PaymentMethod;
import com.hotelmanagement.model.enums.PaymentStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private Long reservationId;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private LocalDateTime paymentDate;
    private PaymentStatus status;
    private String transactionId;
    private Long invoiceId;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}