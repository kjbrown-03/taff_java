package com.hotelmanagement.service;

import com.hotelmanagement.model.RoomType;
import com.hotelmanagement.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public Optional<RoomType> getRoomTypeById(Long id) {
        return roomTypeRepository.findById(id);
    }

    public RoomType createRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(Long id, RoomType roomTypeDetails) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room type not found with id: " + id));

        roomType.setName(roomTypeDetails.getName());
        roomType.setDescription(roomTypeDetails.getDescription());
        roomType.setBasePrice(roomTypeDetails.getBasePrice());
        roomType.setCapacity(roomTypeDetails.getCapacity());
        roomType.setImageUrl(roomTypeDetails.getImageUrl());

        return roomTypeRepository.save(roomType);
    }

    public void deleteRoomType(Long id) {
        roomTypeRepository.deleteById(id);
    }
}