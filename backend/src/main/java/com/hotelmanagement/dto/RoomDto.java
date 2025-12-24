package com.hotelmanagement.dto;

import com.hotelmanagement.model.enums.RoomStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RoomDto {
    private Long id;
    private String roomNumber;
    private Long roomTypeId;
    private String roomTypeName;
    private Integer floor;
    private BigDecimal price;
    private RoomStatus status;
    private Integer maxOccupancy;
    private String description;
    private List<String> amenities;
    private List<String> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}