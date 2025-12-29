package com.hotel.management.service;

import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation UserDetailsService utilisée par la configuration de sécurité.
 *
 * NOTE: le projet contient des packages `com.hotelmanagement.*` et `com.hotel.management.*`.
 * Cette classe est placée dans `com.hotel.management.service` car la configuration de sécurité
 * référencée dans le projet attend `com.hotel.management.service.UserDetailsServiceImpl`.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        List<GrantedAuthority> authorities = getAuthorities(user);

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getEnabled(),
                true,
                true,
                true,
                authorities
        );
    }

    private List<GrantedAuthority> getAuthorities(User user) {
        if (user.getRole() == null || user.getRole().getName() == null) {
            return Collections.emptyList();
        }
        // Normalize role name and add ROLE_ prefix if not present
        String roleName = user.getRole().getName().trim().toUpperCase();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }
        return List.of(new SimpleGrantedAuthority(roleName));
    }
}

