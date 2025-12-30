package com.hotelmanagement.repository;

import com.hotelmanagement.model.ServiceBooking;
import com.hotelmanagement.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {
    List<ServiceBooking> findByReservation_Id(Long reservationId);
    List<ServiceBooking> findByService_Id(Long serviceId);
    List<ServiceBooking> findByStatus(BookingStatus status);
}