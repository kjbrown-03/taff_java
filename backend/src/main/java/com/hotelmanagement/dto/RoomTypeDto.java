package com.hotelmanagement.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RoomTypeDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private Integer capacity;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}