package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.TimesheetDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Staff;
import com.hotelmanagement.model.Timesheet;
import com.hotelmanagement.repository.StaffRepository;
import com.hotelmanagement.repository.TimesheetRepository;
import com.hotelmanagement.service.TimesheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TimesheetServiceImpl implements TimesheetService {

    private final TimesheetRepository timesheetRepository;
    private final StaffRepository staffRepository;
    private final MapperService mapperService;

    @Override
    public TimesheetDto createTimesheet(Long staffId, LocalDate date, LocalTime checkInTime) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        // Check if timesheet already exists for this date
        if (timesheetRepository.findByStaff_IdAndDate(staffId, date).isPresent()) {
            throw new RuntimeException("Timesheet already exists for this date");
        }

        Timesheet timesheet = new Timesheet();
        timesheet.setStaff(staff);
        timesheet.setDate(date);
        timesheet.setCheckInTime(checkInTime);
        timesheet.setCreatedAt(LocalDateTime.now());

        Timesheet savedTimesheet = timesheetRepository.save(timesheet);
        return mapperService.toTimesheetDto(savedTimesheet);
    }

    @Override
    public TimesheetDto updateTimesheet(Long timesheetId, LocalTime checkOutTime) {
        Timesheet timesheet = timesheetRepository.findById(timesheetId)
                .orElseThrow(() -> new RuntimeException("Timesheet not found"));

        timesheet.setCheckOutTime(checkOutTime);

        if (timesheet.getCheckInTime() != null && checkOutTime != null) {
            Duration duration = Duration.between(timesheet.getCheckInTime(), checkOutTime);
            long minutes = duration.toMinutes();
            double hours = minutes / 60.0;
            timesheet.setHoursWorked(hours);
        }

        timesheet.setUpdatedAt(LocalDateTime.now());
        Timesheet updatedTimesheet = timesheetRepository.save(timesheet);
        return mapperService.toTimesheetDto(updatedTimesheet);
    }

    @Override
    public TimesheetDto getTimesheetById(Long id) {
        Timesheet timesheet = timesheetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timesheet not found"));
        return mapperService.toTimesheetDto(timesheet);
    }

    @Override
    public List<TimesheetDto> getTimesheetsByStaffId(Long staffId) {
        List<Timesheet> timesheets = timesheetRepository.findByStaff_Id(staffId);
        return timesheets.stream()
                .map(mapperService::toTimesheetDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TimesheetDto> getTimesheetsByDateRange(Long staffId, LocalDate startDate, LocalDate endDate) {
        List<Timesheet> timesheets = timesheetRepository.findByDateBetween(startDate, endDate);
        return timesheets.stream()
                .filter(t -> t.getStaff().getId().equals(staffId))
                .map(mapperService::toTimesheetDto)
                .collect(Collectors.toList());
    }

    @Override
    public TimesheetDto getTimesheetByStaffIdAndDate(Long staffId, LocalDate date) {
        Timesheet timesheet = timesheetRepository.findByStaff_IdAndDate(staffId, date)
                .orElseThrow(() -> new RuntimeException("Timesheet not found for the given staff and date"));
        return mapperService.toTimesheetDto(timesheet);
    }

    @Override
    public void deleteTimesheet(Long id) {
        if (!timesheetRepository.existsById(id)) {
            throw new RuntimeException("Timesheet not found");
        }
        timesheetRepository.deleteById(id);
    }
}