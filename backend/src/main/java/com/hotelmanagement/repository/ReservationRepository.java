package com.hotelmanagement.repository;

import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.model.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Reservations par guest (via guest_id dans Reservation)
    List<Reservation> findByGuest_Id(Long guestId);

    // Reservations par room (via room_id dans Reservation)
    List<Reservation> findByRoom_Id(Long roomId);

    // Reservations par statut
    List<Reservation> findByStatus(ReservationStatus status);

    // Reservations actuelles (occupées à une date donnée)
    @Query("SELECT r FROM Reservation r " +
            "WHERE r.checkInDate <= :date " +
            "AND r.checkOutDate >= :date " +
            "AND r.status IN ('CONFIRMED', 'CHECKED_IN')")
    List<Reservation> findCurrentReservations(@Param("date") LocalDate date);

    // Vérifie les chevauchements pour une chambre (utile pour éviter double réservation)
    @Query("SELECT COUNT(r) FROM Reservation r " +
            "WHERE r.room.id = :roomId " +
            "AND r.checkInDate < :checkoutDate " +
            "AND r.checkOutDate > :checkinDate " +
            "AND r.status IN ('CONFIRMED', 'CHECKED_IN')")
    Long countOverlappingReservations(
            @Param("roomId") Long roomId,
            @Param("checkinDate") LocalDate checkinDate,
            @Param("checkoutDate") LocalDate checkoutDate);

    // Bonus : toutes les réservations d'un guest (plus robuste que findByGuestId si besoin)
    @Query("SELECT r FROM Reservation r WHERE r.guest.id = :guestId")
    List<Reservation> findAllByGuestId(@Param("guestId") Long guestId);
}