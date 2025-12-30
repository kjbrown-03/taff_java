package com.hotelmanagement.repository;

import com.hotelmanagement.model.Invoice;
import com.hotelmanagement.model.enums.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByReservation_Id(Long reservationId);
    List<Invoice> findByStatus(InvoiceStatus status);
}