package com.hotelmanagement.controller;

import com.hotelmanagement.dto.UserDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.User;
import com.hotelmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private MapperService mapperService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDto> userDtos = users.stream()
                .map(user -> mapperService.map(user, UserDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> mapperService.map(user, UserDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        User user = mapperService.map(userDto, User.class);
        User savedUser = userService.createUser(user);
        UserDto savedUserDto = mapperService.map(savedUser, UserDto.class);
        return ResponseEntity.ok(savedUserDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        User user = mapperService.map(userDto, User.class);
        User updatedUser = userService.updateUser(id, user);
        UserDto updatedUserDto = mapperService.map(updatedUser, UserDto.class);
        return ResponseEntity.ok(updatedUserDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto userDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userService.getAuthenticatedUser(username);
        
        User user = mapperService.map(userDto, User.class);
        user.setId(currentUser.getId());
        User updatedUser = userService.updateProfile(user);
        UserDto updatedUserDto = mapperService.map(updatedUser, UserDto.class);
        return ResponseEntity.ok(updatedUserDto);
    }
    
    @PutMapping("/profile/photo")
    public ResponseEntity<UserDto> uploadProfilePhoto(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User updatedUser = userService.uploadProfilePhoto(username, file);
        UserDto updatedUserDto = mapperService.map(updatedUser, UserDto.class);
        return ResponseEntity.ok(updatedUserDto);
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserDto> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userService.getAuthenticatedUser(username);
        UserDto userDto = mapperService.map(user, UserDto.class);
        
        return ResponseEntity.ok(userDto);
    }
}