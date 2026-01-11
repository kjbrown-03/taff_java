package com.hotelmanagement.controller;

import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.service.PaymentService;
import com.hotelmanagement.service.ReservationService;
import com.hotelmanagement.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ReservationService reservationService;
    private final RoomService roomService;
    private final PaymentService paymentService;
    private final UserRepository userRepository;

    // Dashboard Admin - Vue complète du système
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalRooms = roomService.getAllRooms().size();
        long occupiedToday = reservationService.getCurrentReservations().size();
        long availableRooms = totalRooms - occupiedToday;
        
        // Revenus du jour
        BigDecimal todaysRevenue = paymentService.getTodaysPayments().stream()
                .map(p -> p.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        stats.put("role", "ADMIN");
        stats.put("todaysReservations", reservationService.getCurrentReservations());
        stats.put("totalRooms", totalRooms);
        stats.put("occupiedRooms", occupiedToday);
        stats.put("availableRooms", availableRooms);
        stats.put("todaysRevenue", todaysRevenue);
        stats.put("totalReservations", reservationService.getAllReservations().size());
        stats.put("todaysPayments", paymentService.getTodaysPayments().size());
        
        return ResponseEntity.ok(stats);
    }

    // Dashboard Réceptionniste - Vue opérationnelle
    @GetMapping("/receptionist")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPTIONIST')")
    public ResponseEntity<Map<String, Object>> getReceptionistDashboard() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalRooms = roomService.getAllRooms().size();
        long occupiedToday = reservationService.getCurrentReservations().size();
        long availableRooms = totalRooms - occupiedToday;
        
        stats.put("role", "RECEPTIONIST");
        stats.put("todaysReservations", reservationService.getCurrentReservations());
        stats.put("totalRooms", totalRooms);
        stats.put("occupiedRooms", occupiedToday);
        stats.put("availableRooms", availableRooms);
        stats.put("checkInsToday", reservationService.getCurrentReservations().size());
        stats.put("checkOutsToday", 0); // À implémenter
        
        return ResponseEntity.ok(stats);
    }

    // Dashboard Client - Vue personnalisée
    @GetMapping("/client")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENT')")
    public ResponseEntity<Map<String, Object>> getClientDashboard() {
        Map<String, Object> stats = new HashMap<>();
        
        // Récupérer l'utilisateur connecté
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Récupérer les réservations du client (si Guest existe)
        // Pour l'instant, on retourne des stats générales
        stats.put("role", "CLIENT");
        stats.put("user", Map.of(
            "username", currentUser.getUsername(),
            "firstName", currentUser.getFirstName(),
            "lastName", currentUser.getLastName()
        ));
        stats.put("myReservations", reservationService.getAllReservations()); // À filtrer par guest
        stats.put("availableRooms", roomService.getAllRooms().size());
        
        return ResponseEntity.ok(stats);
    }

    // Dashboard général - adapté selon le rôle de l'utilisateur
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        // Vérifier le rôle et rediriger vers le bon dashboard
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isReceptionist = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_RECEPTIONIST"));
        boolean isClient = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_CLIENT"));
        
        if (isAdmin) {
            return getAdminDashboard();
        } else if (isReceptionist) {
            return getReceptionistDashboard();
        } else if (isClient) {
            return getClientDashboard();
        }
        
        // Par défaut, retourner un dashboard basique
        Map<String, Object> stats = new HashMap<>();
        stats.put("message", "No specific dashboard for your role");
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardOverview() {
        return getDashboardStats();
    }
}