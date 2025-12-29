package com.hotelmanagement.repository;

import com.hotelmanagement.model.Room;
import com.hotelmanagement.model.RoomType;
import com.hotelmanagement.model.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByRoomNumber(String roomNumber);

    // find rooms by RoomType entity
    List<Room> findByRoomType(RoomType roomType);

    // Si tu as un champ RoomStatus status dans Room
    List<Room> findByStatus(RoomStatus status);

    // Méthodes personnalisées avec requêtes JPQL
    @Query("SELECT r FROM Room r WHERE r.id NOT IN " +
            "(SELECT res.room.id FROM Reservation res " +
            "WHERE res.checkInDate < :checkoutDate " +
            "AND res.checkOutDate > :checkinDate " +
            "AND res.status IN ('CONFIRMED', 'CHECKED_IN'))")
    List<Room> findAvailableRooms(
            @Param("checkinDate") LocalDate checkinDate,
            @Param("checkoutDate") LocalDate checkoutDate);

    @Query("SELECT r FROM Room r WHERE r.id IN " +
            "(SELECT res.room.id FROM Reservation res " +
            "WHERE res.checkInDate <= CURRENT_DATE " +
            "AND res.checkOutDate >= CURRENT_DATE " +
            "AND res.status IN ('CONFIRMED', 'CHECKED_IN'))")
    List<Room> findOccupiedRooms();

    // Supprimé : findByRoomTypeId(Long) → probablement inutile si tu as l'enum RoomType
    // Supprimé : findByStatus(String) → redondant avec findByStatus(RoomStatus)
}