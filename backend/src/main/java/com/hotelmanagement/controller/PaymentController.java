package com.hotelmanagement.controller;

import com.hotelmanagement.dto.PaymentDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Payment;
import com.hotelmanagement.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;
    private final MapperService mapperService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('CLIENT')")
    public ResponseEntity<PaymentDto> createPayment(@RequestBody PaymentDto paymentDto) {
        Payment payment = mapperService.map(paymentDto, Payment.class);
        Payment savedPayment = paymentService.createPayment(payment);
        PaymentDto savedPaymentDto = mapperService.map(savedPayment, PaymentDto.class);
        return ResponseEntity.ok(savedPaymentDto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        List<PaymentDto> paymentDtos = payments.stream()
                .map(payment -> mapperService.map(payment, PaymentDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(paymentDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('CLIENT')")
    public ResponseEntity<PaymentDto> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(payment -> mapperService.map(payment, PaymentDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/reservation/{reservationId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('CLIENT')")
    public ResponseEntity<List<PaymentDto>> getPaymentsByReservation(@PathVariable Long reservationId) {
        List<Payment> payments = paymentService.getPaymentsByReservationId(reservationId);
        List<PaymentDto> paymentDtos = payments.stream()
                .map(payment -> mapperService.map(payment, PaymentDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(paymentDtos);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<PaymentDto> updatePaymentStatus(@PathVariable Long id, @RequestParam String status) {
        Payment updatedPayment = paymentService.updatePaymentStatus(id, status);
        PaymentDto updatedPaymentDto = mapperService.map(updatedPayment, PaymentDto.class);
        return ResponseEntity.ok(updatedPaymentDto);
    }
    
    @GetMapping("/today")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<PaymentDto>> getTodaysPayments() {
        List<Payment> payments = paymentService.getTodaysPayments();
        List<PaymentDto> paymentDtos = payments.stream()
                .map(payment -> mapperService.map(payment, PaymentDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(paymentDtos);
    }
}