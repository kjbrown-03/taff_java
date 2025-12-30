package com.hotelmanagement.service;

import com.hotelmanagement.model.Room;
import com.hotelmanagement.model.RoomType;
import com.hotelmanagement.repository.RoomRepository;
import com.hotelmanagement.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setRoomType(roomDetails.getRoomType());
        room.setFloor(roomDetails.getFloor());
        room.setPrice(roomDetails.getPrice());
        room.setStatus(roomDetails.getStatus());
        room.setMaxOccupancy(roomDetails.getMaxOccupancy());
        room.setDescription(roomDetails.getDescription());
        room.setAmenities(roomDetails.getAmenities());
        room.setImages(roomDetails.getImages());

        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public List<Room> getAvailableRooms(LocalDate checkinDate, LocalDate checkoutDate) {
        return roomRepository.findAvailableRooms(checkinDate, checkoutDate);
    }
    
    public List<Room> getOccupiedRooms() {
        // This would typically check reservations to determine occupancy
        // For now, returning rooms with status 'OCCUPIED'
        return roomRepository.findOccupiedRooms();
    }
    
    public List<Room> getRoomsByType(String type) {
        RoomType rt = roomTypeRepository.findByName(type).orElse(null);
        if (rt == null) {
            return List.of();
        }
        return roomRepository.findByRoomType(rt);
    }
    
    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus(com.hotelmanagement.model.enums.RoomStatus.AVAILABLE);
    }
}