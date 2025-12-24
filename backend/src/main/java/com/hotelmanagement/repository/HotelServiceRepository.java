package com.hotelmanagement.repository;

import com.hotelmanagement.model.HotelService;
import com.hotelmanagement.model.enums.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelServiceRepository extends JpaRepository<HotelService, Long> {
    List<HotelService> findByCategory(ServiceCategory category);
    List<HotelService> findByAvailableTrue();
}