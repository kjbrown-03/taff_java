package com.hotelmanagement.service;

import com.hotelmanagement.model.*;
import com.hotelmanagement.model.enums.*;
import com.hotelmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;

@Component
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles and permissions
        initializeRolesAndPermissions();

        // Initialize room types
        initializeRoomTypes();

        // Initialize rooms
        initializeRooms();

        // Initialize departments
        initializeDepartments();

        // Initialize admin user
        initializeAdminUser();

        // Initialize sample staff
        initializeSampleStaff();

        // Initialize sample guest
        initializeSampleGuest();

        // Initialize services
        initializeServices();
    }

    private void initializeRolesAndPermissions() {
        // Create permissions
        Permission viewDashboard = permissionRepository.findByName("VIEW_DASHBOARD")
                .orElseGet(() -> permissionRepository.save(new Permission( "VIEW_DASHBOARD", "dashboard", "view", "View dashboard")));
        
        Permission manageUsers = permissionRepository.findByName("MANAGE_USERS")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_USERS", "users", "manage", "Manage users")));
        
        Permission manageRooms = permissionRepository.findByName("MANAGE_ROOMS")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_ROOMS", "rooms", "manage", "Manage rooms")));
        
        Permission manageReservations = permissionRepository.findByName("MANAGE_RESERVATIONS")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_RESERVATIONS", "reservations", "manage", "Manage reservations")));
        
        Permission manageGuests = permissionRepository.findByName("MANAGE_GUESTS")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_GUESTS", "guests", "manage", "Manage guests")));
        
        Permission managePayments = permissionRepository.findByName("MANAGE_PAYMENTS")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_PAYMENTS", "payments", "manage", "Manage payments")));
        
        Permission manageServices = permissionRepository.findByName("MANAGE_SERVICES")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_SERVICES", "services", "manage", "Manage services")));
        
        Permission manageStaff = permissionRepository.findByName("MANAGE_STAFF")
                .orElseGet(() -> permissionRepository.save(new Permission( "MANAGE_STAFF", "staff", "manage", "Manage staff")));
        
        Permission generateReports = permissionRepository.findByName("GENERATE_REPORTS")
                .orElseGet(() -> permissionRepository.save(new Permission( "GENERATE_REPORTS", "reports", "generate", "Generate reports")));

        // Create roles
        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ADMIN");
                    role.setDescription("Administrator with full access");
                    role.setPermissions(new HashSet<>(Arrays.asList(
                            viewDashboard, manageUsers, manageRooms, manageReservations, 
                            manageGuests, managePayments, manageServices, manageStaff, generateReports)));
                    return roleRepository.save(role);
                });

        Role managerRole = roleRepository.findByName("MANAGER")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("MANAGER");
                    role.setDescription("Manager with operational access");
                    role.setPermissions(new HashSet<>(Arrays.asList(
                            viewDashboard, manageRooms, manageReservations, 
                            manageGuests, managePayments, manageServices, manageStaff, generateReports)));
                    return roleRepository.save(role);
                });

        Role receptionistRole = roleRepository.findByName("RECEPTIONIST")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("RECEPTIONIST");
                    role.setDescription("Receptionist with front desk access");
                    role.setPermissions(new HashSet<>(Arrays.asList(
                            viewDashboard, manageReservations, manageGuests, managePayments)));
                    return roleRepository.save(role);
                });

        Role guestRole = roleRepository.findByName("GUEST")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("GUEST");
                    role.setDescription("Guest with limited access");
                    role.setPermissions(new HashSet<>(Arrays.asList(viewDashboard)));
                    return roleRepository.save(role);
                });
    }

    private void initializeRoomTypes() {
        RoomType standard = roomTypeRepository.findByName("Standard Room")
                .orElseGet(() -> {
                    RoomType rt = new RoomType();
                    rt.setName("Standard Room");
                    rt.setDescription("Comfortable room with essential amenities");
                    rt.setBasePrice(new BigDecimal("100.00"));
                    rt.setCapacity(2);
                    rt.setImageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return roomTypeRepository.save(rt);
                });

        RoomType deluxe = roomTypeRepository.findByName("Deluxe Room")
                .orElseGet(() -> {
                    RoomType rt = new RoomType();
                    rt.setName("Deluxe Room");
                    rt.setDescription("Spacious room with premium amenities");
                    rt.setBasePrice(new BigDecimal("150.00"));
                    rt.setCapacity(3);
                    rt.setImageUrl("https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return roomTypeRepository.save(rt);
                });

        RoomType suite = roomTypeRepository.findByName("Suite")
                .orElseGet(() -> {
                    RoomType rt = new RoomType();
                    rt.setName("Suite");
                    rt.setDescription("Luxurious suite with separate living area");
                    rt.setBasePrice(new BigDecimal("250.00"));
                    rt.setCapacity(4);
                    rt.setImageUrl("https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return roomTypeRepository.save(rt);
                });
    }

    private void initializeRooms() {
        RoomType standard = roomTypeRepository.findByName("Standard Room").orElse(null);
        RoomType deluxe = roomTypeRepository.findByName("Deluxe Room").orElse(null);
        RoomType suite = roomTypeRepository.findByName("Suite").orElse(null);

        if (standard != null) {
            for (int i = 101; i <= 110; i++) {
                String roomNumber = String.valueOf(i);
                if (roomRepository.findByRoomNumber(roomNumber).isEmpty()) {
                    Room room = new Room();
                    room.setRoomNumber(roomNumber);
                    room.setRoomType(standard);
                    room.setFloor(1);
                    room.setPrice(new BigDecimal("100.00"));
                    room.setStatus(RoomStatus.AVAILABLE);
                    room.setMaxOccupancy(2);
                    room.setDescription("Standard room with city view");
                    roomRepository.save(room);
                }
            }
        }

        if (deluxe != null) {
            for (int i = 201; i <= 205; i++) {
                String roomNumber = String.valueOf(i);
                if (roomRepository.findByRoomNumber(roomNumber).isEmpty()) {
                    Room room = new Room();
                    room.setRoomNumber(roomNumber);
                    room.setRoomType(deluxe);
                    room.setFloor(2);
                    room.setPrice(new BigDecimal("150.00"));
                    room.setStatus(RoomStatus.AVAILABLE);
                    room.setMaxOccupancy(3);
                    room.setDescription("Deluxe room with balcony");
                    roomRepository.save(room);
                }
            }
        }

        if (suite != null) {
            for (int i = 301; i <= 303; i++) {
                String roomNumber = String.valueOf(i);
                if (roomRepository.findByRoomNumber(roomNumber).isEmpty()) {
                    Room room = new Room();
                    room.setRoomNumber(roomNumber);
                    room.setRoomType(suite);
                    room.setFloor(3);
                    room.setPrice(new BigDecimal("250.00"));
                    room.setStatus(RoomStatus.AVAILABLE);
                    room.setMaxOccupancy(4);
                    room.setDescription("Luxury suite with panoramic view");
                    roomRepository.save(room);
                }
            }
        }
    }

    private void initializeDepartments() {
        departmentRepository.findByName("Front Office")
                .orElseGet(() -> {
                    Department dept = new Department();
                    dept.setName("Front Office");
                    dept.setDescription("Handles guest check-ins, check-outs, and reservations");
                    return departmentRepository.save(dept);
                });

        departmentRepository.findByName("Housekeeping")
                .orElseGet(() -> {
                    Department dept = new Department();
                    dept.setName("Housekeeping");
                    dept.setDescription("Maintains cleanliness and upkeep of rooms and facilities");
                    return departmentRepository.save(dept);
                });

        departmentRepository.findByName("Food & Beverage")
                .orElseGet(() -> {
                    Department dept = new Department();
                    dept.setName("Food & Beverage");
                    dept.setDescription("Manages restaurants, bars, and room service");
                    return departmentRepository.save(dept);
                });

        departmentRepository.findByName("Maintenance")
                .orElseGet(() -> {
                    Department dept = new Department();
                    dept.setName("Maintenance");
                    dept.setDescription("Handles repairs and maintenance of hotel facilities");
                    return departmentRepository.save(dept);
                });
    }

    private void initializeAdminUser() {
        Role adminRole = roleRepository.findByName("ADMIN").orElse(null);
        
        if (adminRole != null && userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@hotel.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setPhone("+1234567890");
            admin.setRole(adminRole);
            admin.setEnabled(true);
            userRepository.save(admin);
        }
    }

    private void initializeSampleStaff() {
        Role staffRole = roleRepository.findByName("STAFF").orElse(null);
        if (staffRole == null) {
            staffRole = roleRepository.findByName("RECEPTIONIST").orElse(null);
        }
        
        Department frontOffice = departmentRepository.findByName("Front Office").orElse(null);
        
        if (staffRole != null && frontOffice != null && staffRepository.findByEmployeeId("EMP001").isEmpty()) {
            // Create user for staff
            User staffUser = new User();
            staffUser.setUsername("john_receptionist");
            staffUser.setEmail("john.receptionist@hotel.com");
            staffUser.setPassword(passwordEncoder.encode("staff123"));
            staffUser.setFirstName("John");
            staffUser.setLastName("Doe");
            staffUser.setPhone("+1234567891");
            staffUser.setRole(staffRole);
            staffUser.setEnabled(true);
            staffUser = userRepository.save(staffUser);
            
            // Create staff record
            Staff staff = new Staff();
            staff.setUser(staffUser);
            staff.setEmployeeId("EMP001");
            staff.setDepartment(frontOffice);
            staff.setPosition("Receptionist");
            staff.setSalary(new BigDecimal("3000.00"));
            staff.setHireDate(LocalDate.now());
            staff.setActive(true);
            staff.setEmergencyContact("Jane Doe");
            staff.setEmergencyPhone("+1234567892");
            staffRepository.save(staff);
        }
    }

    private void initializeSampleGuest() {
        if (guestRepository.findByEmail("guest@example.com").isEmpty()) {
            Guest guest = new Guest();
            guest.setFirstName("Sample");
            guest.setLastName("Guest");
            guest.setEmail("guest@example.com");
            guest.setPhone("+1234567893");
            guest.setAddress("123 Main St");
            guest.setCity("New York");
            guest.setCountry("USA");
            guest.setPostalCode("10001");
            guest.setDocumentType("Passport");
            guest.setDocumentNumber("P12345678");
            guest.setDateOfBirth(LocalDate.of(1990, 1, 1));
            guest.setPreferences("Non-smoking room, King size bed");
            guest.setNationality("American");
            guest.setVip(false);
            guestRepository.save(guest);
        }
    }

    private void initializeServices() {
        serviceRepository.findByName("Room Service")
                .orElseGet(() -> {
                    HotelService service = new HotelService();
                    service.setName("Room Service");
                    service.setDescription("24-hour room service with menu selection");
                    service.setPrice(new BigDecimal("10.00"));
                    service.setCategory(ServiceCategory.ROOM_SERVICE);
                    service.setAvailable(true);
                    service.setDuration(30);
                    service.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return serviceRepository.save(service);
                });

        serviceRepository.findByName("Spa Treatment")
                .orElseGet(() -> {
                    HotelService service = new HotelService();
                    service.setName("Spa Treatment");
                    service.setDescription("Full body massage and relaxation treatment");
                    service.setPrice(new BigDecimal("120.00"));
                    service.setCategory(ServiceCategory.SPA);
                    service.setAvailable(true);
                    service.setDuration(90);
                    service.setImageUrl("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return serviceRepository.save(service);
                });

        serviceRepository.findByName("Laundry Service")
                .orElseGet(() -> {
                    HotelService service = new HotelService();
                    service.setName("Laundry Service");
                    service.setDescription("Wash, dry, and fold laundry service");
                    service.setPrice(new BigDecimal("25.00"));
                    service.setCategory(ServiceCategory.LAUNDRY);
                    service.setAvailable(true);
                    service.setDuration(480); // 8 hours for return
                    service.setImageUrl("https://images.unsplash.com/photo-1512909006721-06637462b8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return serviceRepository.save(service);
                });

        serviceRepository.findByName("Airport Transfer")
                .orElseGet(() -> {
                    HotelService service = new HotelService();
                    service.setName("Airport Transfer");
                    service.setDescription("Pickup and drop-off service to/from airport");
                    service.setPrice(new BigDecimal("50.00"));
                    service.setCategory(ServiceCategory.TRANSPORT);
                    service.setAvailable(true);
                    service.setDuration(60);
                    service.setImageUrl("https://images.unsplash.com/photo-1569516449331-6fc9bc6b0b64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80");
                    return serviceRepository.save(service);
                });
    }
}