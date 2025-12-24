package com.hotelmanagement.repository;

import com.hotelmanagement.model.ServiceBooking;
import com.hotelmanagement.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {
    List<ServiceBooking> findByReservationId(Long reservationId);
    List<ServiceBooking> findByServiceId(Long serviceId);
    List<ServiceBooking> findByStatus(BookingStatus status);
}