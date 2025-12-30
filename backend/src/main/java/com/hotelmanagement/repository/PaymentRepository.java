package com.hotelmanagement.repository;

import com.hotelmanagement.model.Payment;
import com.hotelmanagement.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByReservation_Id(Long reservationId);
    List<Payment> findByStatus(PaymentStatus status);
    
    List<Payment> findByStatus(String status);
    
    @org.springframework.data.jpa.repository.Query("SELECT p FROM Payment p WHERE DATE(p.paymentDate) = CURRENT_DATE")
    List<Payment> findTodaysPayments();
}