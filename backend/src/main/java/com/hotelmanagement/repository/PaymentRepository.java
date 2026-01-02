package com.hotelmanagement.repository;

import com.hotelmanagement.model.Payment;
import com.hotelmanagement.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Paiements par réservation
    List<Payment> findByReservationId(Long reservationId);

    // Paiements par statut
    List<Payment> findByStatus(PaymentStatus status);

    // Paiements d'aujourd'hui
    @Query("SELECT p FROM Payment p WHERE FUNCTION('DATE', p.paymentDate) = CURRENT_DATE")
    List<Payment> findTodaysPayments();

    // Paiements par guest (via réservation → guest)
    @Query("SELECT p FROM Payment p WHERE p.reservation.guest.id = :guestId")
    List<Payment> findByGuestId(@Param("guestId") Long guestId);
}