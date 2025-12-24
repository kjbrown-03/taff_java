package com.hotelmanagement.repository;

import com.hotelmanagement.model.Payment;
import com.hotelmanagement.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByReservationId(Long reservationId);
    List<Payment> findByStatus(PaymentStatus status);
}