package com.hotelmanagement.service;

import com.hotelmanagement.model.Permission;
import com.hotelmanagement.model.Role;
import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.PermissionRepository;
import com.hotelmanagement.repository.RoleRepository;
import com.hotelmanagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        initializeRolesAndPermissions();
        initializeAdminUser();
    }

    private void initializeRolesAndPermissions() {
        // Liste des permissions
        List<String> permissionNames = List.of(
                "VIEW_ROOMS", "MANAGE_ROOMS", "VIEW_BOOKINGS", "MANAGE_BOOKINGS",
                "VIEW_USERS", "MANAGE_USERS", "VIEW_STAFF", "MANAGE_STAFF",
                "VIEW_TIMESHEETS", "MANAGE_TIMESHEETS", "VIEW_REPORTS"
        );

        for (String name : permissionNames) {
            if (permissionRepository.findByName(name).isEmpty()) {
                Permission permission = new Permission();
                permission.setName(name);
                permission.setDescription("Permission to " + name.toLowerCase().replace("_", " "));
                permission.setResource(name.split("_")[1].toLowerCase());
                permission.setAction(name.split("_")[0].toLowerCase());
                permissionRepository.save(permission);
            }
        }

        // Création des rôles avec permissions
        createRoleIfNotExists("ADMIN", permissionNames);
        createRoleIfNotExists("RECEPTIONIST", List.of("VIEW_ROOMS", "MANAGE_BOOKINGS", "VIEW_TIMESHEETS"));
        createRoleIfNotExists("MANAGER", List.of("VIEW_ROOMS", "VIEW_BOOKINGS", "VIEW_STAFF", "VIEW_REPORTS"));
        createRoleIfNotExists("CLIENT", List.of("VIEW_ROOMS", "MANAGE_BOOKINGS"));
    }

    private void createRoleIfNotExists(String roleName, List<String> permissionNames) {
        Optional<Role> roleOpt = roleRepository.findByName(roleName);
        Role role = roleOpt.orElse(new Role());
        role.setName(roleName);
        role.setDescription(roleName + " role");

        Set<Permission> permissions = new HashSet<>();
        for (String permName : permissionNames) {
            permissionRepository.findByName(permName).ifPresent(permissions::add);
        }
        role.setPermissions(permissions);

        roleRepository.save(role);
    }

    private void initializeAdminUser() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));

            User admin = new User();
            admin.setUsername("admin");
            admin.setPhone("+1234567890");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(adminRole);

            userRepository.save(admin);
        }

        if (userRepository.findByUsername("john_receptionist").isEmpty()) {
            Role receptionistRole = roleRepository.findByName("RECEPTIONIST")
                    .orElseThrow(() -> new RuntimeException("Receptionist role not found"));

            User receptionist = new User();
            receptionist.setUsername("john_receptionist");
            receptionist.setPhone("+1234567891");
            receptionist.setPassword(passwordEncoder.encode("staff123"));
            receptionist.setRole(receptionistRole);

            userRepository.save(receptionist);
        }
    }
}