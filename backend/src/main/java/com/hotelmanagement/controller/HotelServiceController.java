package com.hotelmanagement.controller;

import com.hotelmanagement.model.HotelService;
import com.hotelmanagement.service.HotelServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class HotelServiceController {

    @Autowired
    private HotelServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<HotelService>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelService> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HotelService> createService(@RequestBody HotelService service) {
        return ResponseEntity.ok(serviceService.createService(service));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelService> updateService(@PathVariable Long id, @RequestBody HotelService serviceDetails) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}