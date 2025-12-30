package com.hotelmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {

    @GetMapping("/carousel")
    public ResponseEntity<List<Map<String, Object>>> getCarouselImages() {
        List<Map<String, Object>> images = new ArrayList<>();
        
        // Hotel exterior and facilities images
        images.add(createImage(1, "/images/hotel-exterior.jpg", "Hotel Exterior"));
        images.add(createImage(2, "/images/luxury-room.jpg", "Luxury Room"));
        images.add(createImage(3, "/images/swimming-pool.jpg", "Swimming Pool"));
        images.add(createImage(4, "/images/gym.jpg", "Gym"));
        images.add(createImage(5, "/images/hotel-lobby.jpg", "Hotel Lobby"));
        images.add(createImage(6, "/images/conference-room.jpg", "Conference Room"));
        images.add(createImage(7, "/images/beach-view.jpg", "Beach View"));
        images.add(createImage(8, "/images/suite.jpg", "Suite"));
        images.add(createImage(9, "/images/single-room.jpg", "Single Room"));
        images.add(createImage(10, "/images/double-room.jpg", "Double Room"));
        
        return ResponseEntity.ok(images);
    }
    
    private Map<String, Object> createImage(int id, String url, String alt) {
        Map<String, Object> image = new HashMap<>();
        image.put("id", id);
        image.put("url", url);
        image.put("alt", alt);
        return image;
    }
}





