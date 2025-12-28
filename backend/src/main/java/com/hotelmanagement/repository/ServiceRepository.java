package com.hotelmanagement.repository;

import com.hotelmanagement.model.HotelService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<HotelService, Long> {

    Optional<HotelService> findByName(String name);
}