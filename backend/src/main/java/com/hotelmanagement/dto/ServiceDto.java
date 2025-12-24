package com.hotelmanagement.dto;

import com.hotelmanagement.model.enums.ServiceCategory;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ServiceDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private ServiceCategory category;
    private Boolean available;
    private Integer duration;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}