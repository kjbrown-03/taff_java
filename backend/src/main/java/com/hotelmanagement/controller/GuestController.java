package com.hotelmanagement.controller;

import com.hotelmanagement.dto.GuestDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Guest;
import com.hotelmanagement.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "*")
public class GuestController {

    @Autowired
    private GuestService guestService;
    
    @Autowired
    private MapperService mapperService;

    @GetMapping
    public ResponseEntity<List<GuestDto>> getAllGuests() {
        List<Guest> guests = guestService.getAllGuests();
        List<GuestDto> guestDtos = guests.stream()
                .map(guest -> mapperService.map(guest, GuestDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(guestDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestDto> getGuestById(@PathVariable Long id) {
        return guestService.getGuestById(id)
                .map(guest -> mapperService.map(guest, GuestDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GuestDto> createGuest(@RequestBody GuestDto guestDto) {
        Guest guest = mapperService.map(guestDto, Guest.class);
        Guest savedGuest = guestService.createGuest(guest);
        GuestDto savedGuestDto = mapperService.map(savedGuest, GuestDto.class);
        return ResponseEntity.ok(savedGuestDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuestDto> updateGuest(@PathVariable Long id, @RequestBody GuestDto guestDto) {
        Guest guest = mapperService.map(guestDto, Guest.class);
        Guest updatedGuest = guestService.updateGuest(id, guest);
        GuestDto updatedGuestDto = mapperService.map(updatedGuest, GuestDto.class);
        return ResponseEntity.ok(updatedGuestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
}