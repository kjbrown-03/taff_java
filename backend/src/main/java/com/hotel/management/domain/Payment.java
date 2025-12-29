package com.hotel.management.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "payments")
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String method; // Visa, Stripe, etc.
    private Double amount;
    private Instant timestamp;

    @OneToOne
    private Reservation reservation;

    private String status; // PAID, FAILED, PENDING

    // getters/setters
    // ...existing code...
}

