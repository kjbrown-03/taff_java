package com.hotelmanagement.service;

import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public Map<String, Object> authenticateUser(String username, String password) {
        try {
            System.out.println("=== AUTHENTICATION DEBUG ===");
            System.out.println("Attempting to authenticate user: " + username);
            
            // First, find the user by username
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> {
                        System.out.println("USER NOT FOUND: " + username);
                        return new RuntimeException("User not found");
                    });
            
            System.out.println("USER FOUND: " + user.getUsername());
            System.out.println("USER ID: " + user.getId());
            System.out.println("USER ENABLED: " + user.getEnabled());
            System.out.println("USER ROLE: " + user.getRole().getName());
            System.out.println("Password hash length: " + user.getPassword().length());
            
            // Then authenticate using the user's actual username and provided password
            System.out.println("Attempting authentication with password...");
            System.out.println(">>> TENTATIVE LOGIN - username: " + user.getUsername() + ", password: [HIDDEN]");
            
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), password));
                System.out.println(">>> AUTHENTIFICATION RÉUSSIE !!");

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateToken(authentication);

                Map<String, Object> response = new HashMap<>();
                response.put("token", jwt);
                response.put("user", user);

                System.out.println("=== AUTHENTICATION COMPLETE ===");
                return response;
            } catch (Exception e) {
                System.out.println(">>> ÉCHEC AUTHENTIFICATION : " + e.getMessage());
                e.printStackTrace();
                throw e;
            }
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            System.out.println("AUTHENTICATION FAILED: Invalid credentials");
            throw new RuntimeException("Invalid credentials");
        } catch (Exception e) {
            System.out.println("AUTHENTICATION ERROR: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Map<String, Object> authenticateByNameAndPhone(String name, String phone, String password) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found with phone: " + phone));

        // Accept if provided name matches firstName or username
        boolean nameMatches = false;
        if (user.getFirstName() != null && user.getFirstName().equalsIgnoreCase(name)) {
            nameMatches = true;
        }
        if (!nameMatches && user.getUsername() != null && user.getUsername().equalsIgnoreCase(name)) {
            nameMatches = true;
        }
        if (!nameMatches) {
            throw new RuntimeException("Name does not match phone record");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("user", user);

        return response;
    }

    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}