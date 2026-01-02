package com.hotelmanagement.controller;

import com.hotelmanagement.service.ReservationService;
import com.hotelmanagement.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ReservationService reservationService;
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalRooms = roomService.getAllRooms().size();
        long occupiedToday = reservationService.getCurrentReservations().size();
        long availableRooms = totalRooms - occupiedToday; // ou roomService.getAvailableRoomsCount()

        stats.put("todaysReservations", reservationService.getCurrentReservations());
        stats.put("totalRooms", totalRooms);
        stats.put("occupiedRooms", occupiedToday);
        stats.put("availableRooms", availableRooms);
        stats.put("todaysRevenue", 0.0); // à implémenter plus tard

        return ResponseEntity.ok(stats);
    }
}