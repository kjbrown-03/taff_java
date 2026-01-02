package com.hotelmanagement.config;

import com.hotelmanagement.model.Role;
import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.RoleRepository;
import com.hotelmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("DataInitializer: Starting initialization...");
        
        // Check if the specific default users already exist, create them if they don't
        boolean needsInitialization = userRepository.findByUsername("john_receptionist").isEmpty();
        
        if (needsInitialization) {
            System.out.println("DataInitializer: Default users not found, creating default users...");
            
            // Check if roles already exist, create them if they don't
            Role adminRole = roleRepository.findByName("ADMIN").orElse(null);
            if (adminRole == null) {
                System.out.println("DataInitializer: Creating ADMIN role...");
                adminRole = new Role();
                adminRole.setName("ADMIN");
                adminRole.setDescription("Administrator with full access");
                adminRole = roleRepository.save(adminRole);
            } else {
                System.out.println("DataInitializer: ADMIN role already exists");
            }
            
            Role receptionistRole = roleRepository.findByName("RECEPTIONIST").orElse(null);
            if (receptionistRole == null) {
                System.out.println("DataInitializer: Creating RECEPTIONIST role...");
                receptionistRole = new Role();
                receptionistRole.setName("RECEPTIONIST");
                receptionistRole.setDescription("Receptionist with front desk access");
                receptionistRole = roleRepository.save(receptionistRole);
            } else {
                System.out.println("DataInitializer: RECEPTIONIST role already exists");
            }
            
            Role clientRole = roleRepository.findByName("CLIENT").orElse(null);
            if (clientRole == null) {
                System.out.println("DataInitializer: Creating CLIENT role...");
                clientRole = new Role();
                clientRole.setName("CLIENT");
                clientRole.setDescription("Client with reservation and payment access");
                clientRole = roleRepository.save(clientRole);
            } else {
                System.out.println("DataInitializer: CLIENT role already exists");
            }
            
            // Create default users
            Role retrievedAdminRole = roleRepository.findByName("ADMIN").orElse(adminRole);
            Role retrievedReceptionistRole = roleRepository.findByName("RECEPTIONIST").orElse(receptionistRole);
            Role retrievedClientRole = roleRepository.findByName("CLIENT").orElse(clientRole);
            
            System.out.println("DataInitializer: Roles retrieved, creating users...");

            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123")); // Default admin password
            adminUser.setEmail("admin@hotel.com");
            adminUser.setFirstName("System");
            adminUser.setLastName("Administrator");
            adminUser.setPhone("+1234567890");
            adminUser.setRole(retrievedAdminRole);
            adminUser.setEnabled(true);

            User receptionistUser = new User();
            receptionistUser.setUsername("john_receptionist");
            receptionistUser.setPassword(passwordEncoder.encode("staff123")); // Using your provided password
            receptionistUser.setEmail("john@hotel.com");
            receptionistUser.setFirstName("John");
            receptionistUser.setLastName("Receptionist");
            receptionistUser.setPhone("+1234567891");
            receptionistUser.setRole(retrievedReceptionistRole);
            receptionistUser.setEnabled(true);

            User clientUser = new User();
            clientUser.setUsername("jane_client");
            clientUser.setPassword(passwordEncoder.encode("client123"));
            clientUser.setEmail("jane@hotel.com");
            clientUser.setFirstName("Jane");
            clientUser.setLastName("Client");
            clientUser.setPhone("+1234567892");
            clientUser.setRole(retrievedClientRole);
            clientUser.setEnabled(true);

            userRepository.saveAll(Arrays.asList(adminUser, receptionistUser, clientUser));
            System.out.println("Default users created successfully!");
            System.out.println("DataInitializer: Created admin user with username: " + adminUser.getUsername());
            System.out.println("DataInitializer: Created receptionist user with username: " + receptionistUser.getUsername());
            System.out.println("DataInitializer: Created client user with username: " + clientUser.getUsername());
        } else {
            System.out.println("Users already exist in database, skipping initialization.");
        }
    }
}