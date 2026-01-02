package com.hotelmanagement.controller;

import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/temp-auth")
@CrossOrigin(origins = "*")
public class TempAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestParam(defaultValue = "admin") String username) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(username);
            if (!userOpt.isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found: " + username);
                return ResponseEntity.status(404).body(error);
            }

            User user = userOpt.get();
            
            // Create a temporary authentication object
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(), 
                user.getPassword(), 
                java.util.Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()))
            );
            
            Authentication auth = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
            );
            
            String token = tokenProvider.generateToken(auth);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("role", user.getRole().getName());
            
            System.out.println("Generated token for user: " + username);
            System.out.println("Token: " + token);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to generate token: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}