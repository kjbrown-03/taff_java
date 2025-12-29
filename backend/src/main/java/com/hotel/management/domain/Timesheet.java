package com.hotel.management.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Timesheet : enregistre les pointages du personnel.
 *
 * Utilise Lombok pour réduire le boilerplate.
 */
@Entity
@Table(name = "timesheets")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode(callSuper = false) // évite l'avertissement Lombok "callSuper" lors de la génération equals/hashCode
public class Timesheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;  // Changé de staff_id → employee_id (plus clair et cohérent avec User)

    @Column(name = "work_date", nullable = false)
    private LocalDate workDate;  // Date du jour de travail (ex: 2025-12-28)

    @Column(name = "check_in")
    private LocalTime checkIn;   // Heure d'arrivée (ex: 09:00:00)

    @Column(name = "check_out")
    private LocalTime checkOut;  // Heure de départ (ex: 18:00:00)

    @Column(name = "status")
    private String status;       // ex: "PRESENT", "LATE", "ABSENT"

    @Column(name = "note", length = 1000)
    private String note;
}