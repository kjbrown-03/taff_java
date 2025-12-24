package com.hotelmanagement.service;

import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation reservationDetails) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));

        reservation.setReservationNumber(reservationDetails.getReservationNumber());
        reservation.setGuest(reservationDetails.getGuest());
        reservation.setRoom(reservationDetails.getRoom());
        reservation.setCheckInDate(reservationDetails.getCheckInDate());
        reservation.setCheckOutDate(reservationDetails.getCheckOutDate());
        reservation.setNumberOfGuests(reservationDetails.getNumberOfGuests());
        reservation.setStatus(reservationDetails.getStatus());
        reservation.setTotalAmount(reservationDetails.getTotalAmount());
        reservation.setPaidAmount(reservationDetails.getPaidAmount());
        reservation.setSpecialRequests(reservationDetails.getSpecialRequests());
        reservation.setActualCheckInDate(reservationDetails.getActualCheckInDate());
        reservation.setActualCheckOutDate(reservationDetails.getActualCheckOutDate());

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<Reservation> getReservationsByGuestId(Long guestId) {
        return reservationRepository.findByGuestId(guestId);
    }

    public List<Reservation> getCurrentReservations() {
        return reservationRepository.findCurrentReservations(LocalDate.now());
    }
}