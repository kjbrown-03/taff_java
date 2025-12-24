package com.hotelmanagement.service;

import com.hotelmanagement.model.Staff;
import com.hotelmanagement.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(Long id) {
        return staffRepository.findById(id);
    }

    public Staff createStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff staffDetails) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));

        staff.setUser(staffDetails.getUser());
        staff.setEmployeeId(staffDetails.getEmployeeId());
        staff.setDepartment(staffDetails.getDepartment());
        staff.setPosition(staffDetails.getPosition());
        staff.setSalary(staffDetails.getSalary());
        staff.setHireDate(staffDetails.getHireDate());
        staff.setActive(staffDetails.getActive());
        staff.setEmergencyContact(staffDetails.getEmergencyContact());
        staff.setEmergencyPhone(staffDetails.getEmergencyPhone());

        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}