package com.hotel.management.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User client;

    @ManyToOne
    private Room room;

    private LocalDateTime fromDate;
    private LocalDateTime toDate;

    private Boolean paid = false;

    // getters/setters
    // ...existing code...
}

