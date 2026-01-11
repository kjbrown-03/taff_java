package com.hotelmanagement.controller;

import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Room;
import com.hotelmanagement.model.RoomType;
import com.hotelmanagement.repository.RoomTypeRepository;
import com.hotelmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;
    
    @Autowired
    private MapperService mapperService;
    
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomDtos = rooms.stream()
                .map(room -> mapperService.map(room, RoomDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id)
                .map(room -> mapperService.map(room, RoomDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(@RequestBody RoomDto roomDto) {
        // Manually handle roomType conversion
        RoomType roomType = roomTypeRepository.findById(roomDto.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("Room type not found with id: " + roomDto.getRoomTypeId()));
        
        Room room = mapperService.map(roomDto, Room.class);
        room.setRoomType(roomType);
        
        Room savedRoom = roomService.createRoom(room);
        RoomDto savedRoomDto = mapperService.map(savedRoom, RoomDto.class);
        return ResponseEntity.ok(savedRoomDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
        Room room = mapperService.map(roomDto, Room.class);
        Room updatedRoom = roomService.updateRoom(id, room);
        RoomDto updatedRoomDto = mapperService.map(updatedRoom, RoomDto.class);
        return ResponseEntity.ok(updatedRoomDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkinDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkoutDate) {
        return ResponseEntity.ok(roomService.getAvailableRooms(checkinDate, checkoutDate));
    }
    
    @GetMapping("/occupied")
    public ResponseEntity<List<RoomDto>> getOccupiedRooms() {
        List<Room> rooms = roomService.getOccupiedRooms();
        List<RoomDto> roomDtos = rooms.stream()
                .map(room -> mapperService.map(room, RoomDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<RoomDto>> getRoomsByType(@RequestParam String type) {
        List<Room> rooms = roomService.getRoomsByType(type);
        List<RoomDto> roomDtos = rooms.stream()
                .map(room -> mapperService.map(room, RoomDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }
}