package com.hotelmanagement.controller;

import com.hotelmanagement.dto.LoginDto;
import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.service.AuthService;
import com.hotelmanagement.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginDto loginDto
    ) {
        try {
            // Validation des champs
            if (loginDto.getUsername() == null || loginDto.getUsername().trim().isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Username is required");
                return ResponseEntity.status(400).body(errorResponse);
            }
            
            if (loginDto.getPassword() == null || loginDto.getPassword().trim().isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Password is required");
                return ResponseEntity.status(400).body(errorResponse);
            }
            
            Map<String, Object> response = authService.authenticateUser(
                loginDto.getUsername().trim(),
                loginDto.getPassword()
            );
            return ResponseEntity.ok(response);
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");
            errorResponse.put("message", "Please check your credentials and try again");
            return ResponseEntity.status(401).body(errorResponse);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            if (e.getMessage() != null && e.getMessage().contains("not found")) {
                errorResponse.put("error", "User not found");
                errorResponse.put("message", "The username you entered does not exist");
            } else {
                errorResponse.put("error", e.getMessage() != null ? e.getMessage() : "Authentication failed");
                errorResponse.put("message", "Please check your credentials and try again");
            }
            return ResponseEntity.status(401).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authentication failed");
            errorResponse.put("message", "An error occurred during login. Please try again.");
            e.printStackTrace();
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    
    @PostMapping("/reset-admin-password")
    public ResponseEntity<?> resetAdminPassword() {
        try {
            Optional<User> adminOpt = userRepository.findByUsername("admin");
            if (adminOpt.isPresent()) {
                User admin = adminOpt.get();
                admin.setPassword(passwordEncoder.encode("admin123"));
                userRepository.save(admin);
                
                Map<String, String> response = new HashMap<>();
                response.put("message", "Admin password has been reset to 'admin123'");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Admin user not found");
                return ResponseEntity.status(404).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to reset password: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
