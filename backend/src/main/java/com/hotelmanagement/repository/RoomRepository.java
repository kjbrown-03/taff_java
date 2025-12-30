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
    @Query(value = "SELECT * FROM rooms r WHERE r.id NOT IN (" +
            "SELECT room_id FROM reservations res WHERE res.check_in_date < :checkoutDate " +
            "AND res.check_out_date > :checkinDate AND res.status IN ('CONFIRMED','CHECKED_IN')" +
            ")", nativeQuery = true)
    List<Room> findAvailableRooms(@Param("checkinDate") LocalDate checkinDate,
                                  @Param("checkoutDate") LocalDate checkoutDate);

    @Query(value = "SELECT * FROM rooms r WHERE r.id IN (" +
            "SELECT room_id FROM reservations res WHERE res.check_in_date <= CURRENT_DATE " +
            "AND res.check_out_date >= CURRENT_DATE AND res.status IN ('CONFIRMED','CHECKED_IN')" +
            ")", nativeQuery = true)
    List<Room> findOccupiedRooms();

    // Supprimé : findByRoomTypeId(Long) → probablement inutile si tu as l'enum RoomType
    // Supprimé : findByStatus(String) → redondant avec findByStatus(RoomStatus)
}