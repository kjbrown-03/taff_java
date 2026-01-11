package com.hotelmanagement.service;

import com.hotelmanagement.dto.ReservationDto;
import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.model.enums.ReservationStatus;
import com.hotelmanagement.repository.ReservationRepository;
import com.hotelmanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    // Récupérer toutes les réservations
    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Récupérer une réservation par ID
    public Optional<ReservationDto> getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(this::convertToDto);
    }

    // Récupérer les réservations d'un guest (par guestId)
    public List<ReservationDto> getReservationsByGuestId(Long guestId) {
        return reservationRepository.findByGuest_Id(guestId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Récupérer les réservations par chambre
    public List<ReservationDto> getReservationsByRoomId(Long roomId) {
        return reservationRepository.findByRoom_Id(roomId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Récupérer les réservations par statut
    public List<ReservationDto> getReservationsByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Récupérer les réservations actuelles (occupées aujourd'hui)
    public List<ReservationDto> getCurrentReservations() {
        return reservationRepository.findCurrentReservations(LocalDate.now()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Vérifier si une chambre est disponible entre deux dates
    public boolean isRoomAvailable(Long roomId, LocalDate checkinDate, LocalDate checkoutDate) {
        Long overlapping = reservationRepository.countOverlappingReservations(roomId, checkinDate, checkoutDate);
        return overlapping == 0;
    }

    // Créer une nouvelle réservation
    public ReservationDto createReservation(ReservationDto reservationDto) {
        // Tu peux ajouter ici la validation de disponibilité, calcul du prix, etc.
        Reservation reservation = modelMapper.map(reservationDto, Reservation.class);
        reservation.setStatus(ReservationStatus.PENDING); // ou CONFIRMED selon logique
        Reservation saved = reservationRepository.save(reservation);
        return convertToDto(saved);
    }

    // Mettre à jour une réservation
    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) {
        Reservation existing = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
        modelMapper.map(reservationDto, existing);
        Reservation updated = reservationRepository.save(existing);
        return convertToDto(updated);
    }

    // Annuler une réservation
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    // Conversion Entity → DTO
    private ReservationDto convertToDto(Reservation reservation) {
        return modelMapper.map(reservation, ReservationDto.class);
    }
}