package com.hotelmanagement.service;

import com.hotelmanagement.model.Guest;
import com.hotelmanagement.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    public Optional<Guest> getGuestById(Long id) {
        return guestRepository.findById(id);
    }

    public Guest createGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public Guest updateGuest(Long id, Guest guestDetails) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found with id: " + id));

        guest.setFirstName(guestDetails.getFirstName());
        guest.setLastName(guestDetails.getLastName());
        guest.setEmail(guestDetails.getEmail());
        guest.setPhone(guestDetails.getPhone());
        guest.setAddress(guestDetails.getAddress());
        guest.setCity(guestDetails.getCity());
        guest.setCountry(guestDetails.getCountry());
        guest.setPostalCode(guestDetails.getPostalCode());
        guest.setDocumentType(guestDetails.getDocumentType());
        guest.setDocumentNumber(guestDetails.getDocumentNumber());
        guest.setDateOfBirth(guestDetails.getDateOfBirth());
        guest.setPreferences(guestDetails.getPreferences());
        guest.setNationality(guestDetails.getNationality());
        guest.setVip(guestDetails.getVip());

        return guestRepository.save(guest);
    }

    public void deleteGuest(Long id) {
        guestRepository.deleteById(id);
    }
}