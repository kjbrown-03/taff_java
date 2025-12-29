package com.hotel.management.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;
    private String type; // suite, simple, double, familiale, vue, handicapé
    private Double price;
    private Boolean occupied = false;

    @ElementCollection
    private List<String> imageUrls;

    // getters/setters
    // ...existing code...
}

