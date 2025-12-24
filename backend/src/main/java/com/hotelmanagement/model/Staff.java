package com.hotelmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff extends BaseEntity {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull(message = "User is required")
    private User user;

    @NotBlank(message = "Employee ID is required")
    @Column(unique = true, nullable = false)
    private String employeeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    @NotNull(message = "Department is required")
    private Department department;

    @NotBlank(message = "Position is required")
    @Column(nullable = false)
    private String position;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @NotNull(message = "Hire date is required")
    @Column(nullable = false)
    private LocalDate hireDate;

    private Boolean active = true;
    
    private String emergencyContact;
    private String emergencyPhone;
}
