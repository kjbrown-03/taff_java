package com.hotelmanagement.service;

import com.hotelmanagement.model.Invoice;
import com.hotelmanagement.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice invoiceDetails) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));

        invoice.setInvoiceNumber(invoiceDetails.getInvoiceNumber());
        invoice.setReservation(invoiceDetails.getReservation());
        invoice.setSubtotal(invoiceDetails.getSubtotal());
        invoice.setTax(invoiceDetails.getTax());
        invoice.setDiscount(invoiceDetails.getDiscount());
        invoice.setTotalAmount(invoiceDetails.getTotalAmount());
        invoice.setIssueDate(invoiceDetails.getIssueDate());
        invoice.setDueDate(invoiceDetails.getDueDate());
        invoice.setStatus(invoiceDetails.getStatus());
        invoice.setNotes(invoiceDetails.getNotes());

        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

    public List<Invoice> getInvoicesByReservationId(Long reservationId) {
        return invoiceRepository.findByReservation_Id(reservationId);
    }
}