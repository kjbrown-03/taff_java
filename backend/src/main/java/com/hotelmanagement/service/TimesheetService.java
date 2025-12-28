package com.hotelmanagement.service;

import com.hotelmanagement.dto.TimesheetDto;
import java.time.LocalDate;
import java.util.List;

public interface TimesheetService {
    TimesheetDto createTimesheet(Long staffId, LocalDate date, java.time.LocalTime checkInTime);
    TimesheetDto updateTimesheet(Long timesheetId, java.time.LocalTime checkOutTime);
    TimesheetDto getTimesheetById(Long id);
    List<TimesheetDto> getTimesheetsByStaffId(Long staffId);
    List<TimesheetDto> getTimesheetsByDateRange(Long staffId, LocalDate startDate, LocalDate endDate);
    TimesheetDto getTimesheetByStaffIdAndDate(Long staffId, LocalDate date);
    void deleteTimesheet(Long id);
}