package com.hotelmanagement.repository;

import com.hotelmanagement.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
    List<Timesheet> findByStaff_Id(Long staffId);
    
    Optional<Timesheet> findByStaff_IdAndDate(Long staffId, LocalDate date);
    
    List<Timesheet> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT t FROM Timesheet t WHERE t.staff.id = :staffId AND t.date = :date")
    Optional<Timesheet> findByStaffIdAndDateCustom(@Param("staffId") Long staffId, @Param("date") LocalDate date);
    
    @Query("SELECT t FROM Timesheet t WHERE t.staff.id = :staffId AND t.date >= :startDate AND t.date <= :endDate")
    List<Timesheet> findByStaffIdAndDateRange(@Param("staffId") Long staffId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}