package com.hotelmanagement.service;

import com.hotelmanagement.model.Payment;
import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.PaymentRepository;
import com.hotelmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        payment.setReservation(paymentDetails.getReservation());
        payment.setAmount(paymentDetails.getAmount());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setPaymentDate(paymentDetails.getPaymentDate());
        payment.setStatus(paymentDetails.getStatus());
        payment.setTransactionId(paymentDetails.getTransactionId());
        payment.setInvoice(paymentDetails.getInvoice());
        payment.setNotes(paymentDetails.getNotes());

        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    // Corrigé : bonne méthode
    public List<Payment> getPaymentsByReservationId(Long reservationId) {
        return paymentRepository.findByReservation_Id(reservationId);
    }

    public Payment updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        try {
            com.hotelmanagement.model.enums.PaymentStatus ps = com.hotelmanagement.model.enums.PaymentStatus.valueOf(status.toUpperCase());
            payment.setStatus(ps);
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid payment status: " + status);
        }

        return paymentRepository.save(payment);
    }

    // Corrigé : méthode existante
    public List<Payment> getTodaysPayments() {
        return paymentRepository.findTodaysPayments();
    }

    // Supprimé findByUserId → causait le crash
    // Remplacé par une méthode sûre si besoin
    public List<Payment> getPaymentsByGuestId(Long guestId) {
        return paymentRepository.findByGuestId(guestId);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
}