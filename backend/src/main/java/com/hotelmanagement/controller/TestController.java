package com.hotelmanagement.controller;

import com.hotelmanagement.model.RoomType;
import com.hotelmanagement.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @GetMapping("/room-types")
    public ResponseEntity<?> getAllRoomTypes() {
        try {
            List<RoomType> roomTypes = roomTypeRepository.findAll();
            return ResponseEntity.ok(roomTypes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/room-type/{id}")
    public ResponseEntity<?> getRoomTypeById(@PathVariable Long id) {
        try {
            System.out.println("Looking for room type with ID: " + id);
            
            Optional<RoomType> roomType = roomTypeRepository.findById(id);
            
            if (roomType.isPresent()) {
                System.out.println("Found room type: " + roomType.get().getName());
                return ResponseEntity.ok(roomType.get());
            } else {
                System.out.println("Room type not found for ID: " + id);
                
                // Let's also check what's actually in the database
                List<RoomType> allRoomTypes = roomTypeRepository.findAll();
                System.out.println("All room types in DB:");
                for (RoomType rt : allRoomTypes) {
                    System.out.println("ID: " + rt.getId() + ", Name: " + rt.getName());
                }
                
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error finding room type: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}