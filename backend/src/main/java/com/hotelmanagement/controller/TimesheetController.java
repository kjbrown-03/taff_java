package com.hotelmanagement.controller;

import com.hotelmanagement.dto.TimesheetDto;
import com.hotelmanagement.service.TimesheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/timesheets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TimesheetController {

    private final TimesheetService timesheetService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> createTimesheet(
            @RequestParam Long staffId,
            @RequestParam String date,
            @RequestParam String checkInTime) {
        TimesheetDto timesheet = timesheetService.createTimesheet(
                staffId,
                LocalDate.parse(date),
                LocalTime.parse(checkInTime)
        );
        return ResponseEntity.ok(timesheet);
    }

    @PutMapping("/{timesheetId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> updateTimesheet(
            @PathVariable Long timesheetId,
            @RequestParam String checkOutTime) {
        TimesheetDto timesheet = timesheetService.updateTimesheet(
                timesheetId,
                LocalTime.parse(checkOutTime)
        );
        return ResponseEntity.ok(timesheet);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> getTimesheetById(@PathVariable Long id) {
        TimesheetDto timesheet = timesheetService.getTimesheetById(id);
        return ResponseEntity.ok(timesheet);
    }

    @GetMapping("/staff/{staffId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<TimesheetDto>> getTimesheetsByStaffId(@PathVariable Long staffId) {
        List<TimesheetDto> timesheets = timesheetService.getTimesheetsByStaffId(staffId);
        return ResponseEntity.ok(timesheets);
    }

    @GetMapping("/staff/{staffId}/date-range")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TimesheetDto>> getTimesheetsByDateRange(
            @PathVariable Long staffId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        List<TimesheetDto> timesheets = timesheetService.getTimesheetsByDateRange(
                staffId,
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );
        return ResponseEntity.ok(timesheets);
    }

    @GetMapping("/staff/{staffId}/date/{date}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> getTimesheetByStaffIdAndDate(
            @PathVariable Long staffId,
            @PathVariable String date) {
        TimesheetDto timesheet = timesheetService.getTimesheetByStaffIdAndDate(
                staffId,
                LocalDate.parse(date)
        );
        return ResponseEntity.ok(timesheet);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTimesheet(@PathVariable Long id) {
        timesheetService.deleteTimesheet(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/checkin")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> checkIn(@RequestBody java.util.Map<String, String> request) {
        Long staffId = Long.parseLong(request.get("staffId"));
        String time = request.get("time");
        java.time.LocalTime checkInTime = java.time.LocalTime.parse(time);
        java.time.LocalDate date = java.time.LocalDate.now();
        
        TimesheetDto timesheet = timesheetService.createTimesheet(staffId, date, checkInTime);
        return ResponseEntity.ok(timesheet);
    }
    
    @PostMapping("/checkout")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<TimesheetDto> checkOut(@RequestBody java.util.Map<String, String> request) {
        Long timesheetId = Long.parseLong(request.get("timesheetId"));
        String time = request.get("time");
        java.time.LocalTime checkOutTime = java.time.LocalTime.parse(time);
        
        TimesheetDto timesheet = timesheetService.updateTimesheet(timesheetId, checkOutTime);
        return ResponseEntity.ok(timesheet);
    }
}