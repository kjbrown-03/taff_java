package com.hotelmanagement.controller;

import com.hotelmanagement.model.ServiceBooking;
import com.hotelmanagement.service.ServiceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-bookings")
@CrossOrigin(origins = "*")
public class ServiceBookingController {

    @Autowired
    private ServiceBookingService serviceBookingService;

    @GetMapping
    public ResponseEntity<List<ServiceBooking>> getAllServiceBookings() {
        return ResponseEntity.ok(serviceBookingService.getAllServiceBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceBooking> getServiceBookingById(@PathVariable Long id) {
        return serviceBookingService.getServiceBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceBooking> createServiceBooking(@RequestBody ServiceBooking serviceBooking) {
        return ResponseEntity.ok(serviceBookingService.createServiceBooking(serviceBooking));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceBooking> updateServiceBooking(@PathVariable Long id, @RequestBody ServiceBooking serviceBookingDetails) {
        return ResponseEntity.ok(serviceBookingService.updateServiceBooking(id, serviceBookingDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceBooking(@PathVariable Long id) {
        serviceBookingService.deleteServiceBooking(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<ServiceBooking>> getServiceBookingsByReservationId(@PathVariable Long reservationId) {
        return ResponseEntity.ok(serviceBookingService.getServiceBookingsByReservationId(reservationId));
    }
}