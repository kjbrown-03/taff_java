package com.hotelmanagement.controller;

import com.hotelmanagement.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final UserService userService;
    private final RoomService roomService;
    private final ReservationService reservationService;
    private final PaymentService paymentService;
    private final StaffService staffService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // User statistics
        dashboardData.put("totalUsers", userService.getAllUsers().size());
        dashboardData.put("totalStaff", staffService.getAllStaff().size());
        
        // Room statistics
        dashboardData.put("totalRooms", roomService.getAllRooms().size());
        dashboardData.put("occupiedRooms", roomService.getOccupiedRooms().size());
        dashboardData.put("availableRooms", roomService.getAvailableRooms().size());
        
        // Reservation statistics
        dashboardData.put("totalReservations", reservationService.getAllReservations().size());
        dashboardData.put("todayReservations", reservationService.getTodaysReservations().size());
        
        // Payment statistics
        dashboardData.put("totalPayments", paymentService.getAllPayments().size());
        dashboardData.put("todayPayments", paymentService.getTodaysPayments().size());
        
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/employee")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Map<String, Object>> getEmployeeDashboard() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Room statistics
        dashboardData.put("totalRooms", roomService.getAllRooms().size());
        dashboardData.put("occupiedRooms", roomService.getOccupiedRooms().size());
        dashboardData.put("availableRooms", roomService.getAvailableRooms().size());
        
        // Reservation statistics
        dashboardData.put("todayReservations", reservationService.getTodaysReservations().size());
        
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/client")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> getClientDashboard() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Reservation statistics for the client
        // This would need to be personalized based on the authenticated user
        dashboardData.put("myReservations", 0); // This would be based on authenticated user
        dashboardData.put("myPayments", 0); // This would be based on authenticated user
        
        return ResponseEntity.ok(dashboardData);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalRooms", roomService.getAllRooms().size());
        stats.put("occupiedRooms", roomService.getOccupiedRooms().size());
        stats.put("totalGuests", userService.getAllUsers().size());
        stats.put("staffMembers", staffService.getAllStaff().size());
        stats.put("services", 0); // Placeholder
        stats.put("todayRevenue", paymentService.getTodaysPayments().stream()
                .mapToDouble(p -> p.getAmount().doubleValue())
                .sum());
        
        return ResponseEntity.ok(stats);
    }
}