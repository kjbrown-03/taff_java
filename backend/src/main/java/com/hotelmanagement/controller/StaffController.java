package com.hotelmanagement.controller;

import com.hotelmanagement.dto.StaffDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Staff;
import com.hotelmanagement.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StaffController {

    private final StaffService staffService;
    private final MapperService mapperService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<StaffDto>> getAllStaff() {
        List<Staff> staff = staffService.getAllStaff();
        List<StaffDto> staffDtos = staff.stream()
                .map(s -> mapperService.map(s, StaffDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(staffDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<StaffDto> getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id)
                .map(s -> mapperService.map(s, StaffDto.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffDto> createStaff(@RequestBody StaffDto staffDto) {
        Staff staff = mapperService.map(staffDto, Staff.class);
        Staff savedStaff = staffService.createStaff(staff);
        StaffDto savedStaffDto = mapperService.map(savedStaff, StaffDto.class);
        return ResponseEntity.ok(savedStaffDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffDto> updateStaff(@PathVariable Long id, @RequestBody StaffDto staffDto) {
        Staff staff = mapperService.map(staffDto, Staff.class);
        Staff updatedStaff = staffService.updateStaff(id, staff);
        StaffDto updatedStaffDto = mapperService.map(updatedStaff, StaffDto.class);
        return ResponseEntity.ok(updatedStaffDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }
}