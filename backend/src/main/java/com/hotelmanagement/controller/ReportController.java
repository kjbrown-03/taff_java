package com.hotelmanagement.controller;

import com.hotelmanagement.dto.TimesheetDto;
import com.hotelmanagement.model.User;
import com.hotelmanagement.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReportController {

    private final RoomService roomService;
    private final ReservationService reservationService;
    private final StaffService staffService;
    private final com.hotelmanagement.service.TimesheetService timesheetService;

    @GetMapping("/occupation")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getOccupationReport() {
        Map<String, Object> report = new HashMap<>();
        
        List<?> allRooms = roomService.getAllRooms();
        List<?> occupiedRooms = roomService.getOccupiedRooms();

        double totalRooms = allRooms.size();
        double occupiedCount = occupiedRooms.size();
        double occupationRate = totalRooms > 0 ? (occupiedCount / totalRooms) * 100 : 0;
        
        report.put("currentOccupationRate", occupationRate);
        report.put("totalRooms", (int) totalRooms);
        report.put("occupiedRooms", (int) occupiedCount);
        report.put("availableRooms", (int) (totalRooms - occupiedCount));
        
        return ResponseEntity.ok(report);
    }

    @GetMapping("/absences")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAbsencesReport(@RequestParam String month) {
        Map<String, Object> report = new HashMap<>();
        
        // Parse the month parameter (format: YYYY-MM)
        LocalDate startOfMonth = LocalDate.parse(month + "-01");
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());
        
        // Get timesheets for the month and calculate absences
        List<TimesheetDto> timesheets = timesheetService.getTimesheetsByDateRange(0L, startOfMonth, endOfMonth); // 0L as placeholder for all staff
        
        // Calculate absences (for now return empty list as we need to implement the logic properly)
        report.put("absences", List.of()); // This would contain actual absence data
        report.put("month", month);
        report.put("totalAbsences", 0);
        
        return ResponseEntity.ok(report);
    }

    @GetMapping("/staff-attendance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStaffAttendanceReport(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        Map<String, Object> report = new HashMap<>();
        
        // This would typically be calculated based on timesheets
        // For now, returning a placeholder response
        report.put("attendanceData", List.of()); // This would contain actual attendance data
        report.put("startDate", startDate);
        report.put("endDate", endDate);
        
        return ResponseEntity.ok(report);
    }
}