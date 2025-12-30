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
    List<Reservation> findByGuest_Id(Long guestId);
    List<Reservation> findByRoom_Id(Long roomId);
    List<Reservation> findByStatus(ReservationStatus status);
    
    @Query("SELECT r FROM Reservation r WHERE r.checkInDate <= :date AND r.checkOutDate >= :date AND r.status = 'CONFIRMED'")
    List<Reservation> findCurrentReservations(@Param("date") LocalDate date);
    
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.room.id = :roomId AND r.checkInDate < :checkoutDate AND r.checkOutDate > :checkinDate AND r.status IN ('CONFIRMED', 'CHECKED_IN')")
    Long countOverlappingReservations(@Param("roomId") Long roomId, @Param("checkinDate") LocalDate checkinDate, @Param("checkoutDate") LocalDate checkoutDate);
}