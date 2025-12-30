package com.hotelmanagement.service;

import com.hotelmanagement.model.ServiceBooking;
import com.hotelmanagement.repository.ServiceBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceBookingService {

    @Autowired
    private ServiceBookingRepository serviceBookingRepository;

    public List<ServiceBooking> getAllServiceBookings() {
        return serviceBookingRepository.findAll();
    }

    public Optional<ServiceBooking> getServiceBookingById(Long id) {
        return serviceBookingRepository.findById(id);
    }

    public ServiceBooking createServiceBooking(ServiceBooking serviceBooking) {
        return serviceBookingRepository.save(serviceBooking);
    }

    public ServiceBooking updateServiceBooking(Long id, ServiceBooking serviceBookingDetails) {
        ServiceBooking serviceBooking = serviceBookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service booking not found with id: " + id));

        serviceBooking.setService(serviceBookingDetails.getService());
        serviceBooking.setReservation(serviceBookingDetails.getReservation());
        serviceBooking.setBookingDate(serviceBookingDetails.getBookingDate());
        serviceBooking.setStatus(serviceBookingDetails.getStatus());
        serviceBooking.setQuantity(serviceBookingDetails.getQuantity());
        serviceBooking.setTotalPrice(serviceBookingDetails.getTotalPrice());
        serviceBooking.setNotes(serviceBookingDetails.getNotes());

        return serviceBookingRepository.save(serviceBooking);
    }

    public void deleteServiceBooking(Long id) {
        serviceBookingRepository.deleteById(id);
    }

    public List<ServiceBooking> getServiceBookingsByReservationId(Long reservationId) {
        return serviceBookingRepository.findByReservation_Id(reservationId);
    }
}