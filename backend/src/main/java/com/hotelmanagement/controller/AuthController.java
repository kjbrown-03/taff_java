package com.hotelmanagement.controller;

import com.hotelmanagement.dto.JwtAuthResponse;
import com.hotelmanagement.dto.LoginDto;
import com.hotelmanagement.dto.RegisterDto;
import com.hotelmanagement.model.User;
import com.hotelmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto) {
        Map<String, Object> response = authService.authenticateUser(loginDto.getUsername(), loginDto.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto registerDto) {
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        
        User registeredUser = authService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
}