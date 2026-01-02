package com.hotelmanagement.service;

import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // IntelliJ va souligner User et UserRepository en rouge → clique dessus avec Alt+Enter
        // → "Import class" → choisis la bonne classe User et UserRepository de ton projet

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // Logs de debug
        System.out.println("=== CHARGEMENT UTILISATEUR ===");
        System.out.println("Username demandé : " + username);
        System.out.println("User trouvé : " + user.getUsername());
        System.out.println("Password hash : " + user.getPassword());
        System.out.println("Enabled brut : " + user.getEnabled());
        if (user.getEnabled() != null) {
            System.out.println("Classe de enabled : " + user.getEnabled().getClass().getName());
        }

        // TEST TEMPORAIRE : on force l'utilisateur activé
        boolean enabled = true;

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                enabled,  // forcé à true
                true,
                true,
                true,
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().getName())
                )
        );
    }
}