package com.hotelmanagement.service;

import com.hotelmanagement.model.HotelService;
import com.hotelmanagement.repository.HotelServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private HotelServiceRepository serviceRepository;

    public List<HotelService> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<HotelService> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public HotelService createService(HotelService service) {
        return serviceRepository.save(service);
    }

    public HotelService updateService(Long id, HotelService serviceDetails) {
        HotelService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));

        service.setName(serviceDetails.getName());
        service.setDescription(serviceDetails.getDescription());
        service.setPrice(serviceDetails.getPrice());
        service.setCategory(serviceDetails.getCategory());
        service.setAvailable(serviceDetails.getAvailable());
        service.setDuration(serviceDetails.getDuration());
        service.setImageUrl(serviceDetails.getImageUrl());

        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}