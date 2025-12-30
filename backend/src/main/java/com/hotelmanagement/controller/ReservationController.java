package com.hotelmanagement.controller;

import com.hotelmanagement.dto.ReservationDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    
    @Autowired
    private MapperService mapperService;

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        List<ReservationDto> reservationDtos = reservations.stream()
                .map(reservation -> mapperService.map(reservation, ReservationDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservationDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(reservation -> mapperService.map(reservation, ReservationDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        Reservation reservation = mapperService.map(reservationDto, Reservation.class);
        Reservation savedReservation = reservationService.createReservation(reservation);
        ReservationDto savedReservationDto = mapperService.map(savedReservation, ReservationDto.class);
        return ResponseEntity.ok(savedReservationDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDto> updateReservation(@PathVariable Long id, @RequestBody ReservationDto reservationDto) {
        Reservation reservation = mapperService.map(reservationDto, Reservation.class);
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
        ReservationDto updatedReservationDto = mapperService.map(updatedReservation, ReservationDto.class);
        return ResponseEntity.ok(updatedReservationDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/guest/{guestId}")
    public ResponseEntity<List<Reservation>> getReservationsByGuestId(@PathVariable Long guestId) {
        return ResponseEntity.ok(reservationService.getReservationsByGuestId(guestId));
    }

    @GetMapping("/current")
    public ResponseEntity<List<Reservation>> getCurrentReservations() {
        return ResponseEntity.ok(reservationService.getCurrentReservations());
    }
    
    @GetMapping("/my")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<ReservationDto>> getMyReservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        // Get user ID from username and fetch reservations
        // This would need UserService to get user by username
        // For now, returning empty list - should be implemented
        List<Reservation> reservations = reservationService.getAllReservations(); // Placeholder
        List<ReservationDto> reservationDtos = reservations.stream()
                .map(reservation -> mapperService.map(reservation, ReservationDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservationDtos);
    }
}