package com.hotelmanagement.config;

import com.hotelmanagement.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/temp-auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // Dashboard - accessible selon le rôle
                .requestMatchers("/api/dashboard/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/dashboard/receptionist/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                .requestMatchers("/api/dashboard/client/**").hasAnyRole("ADMIN", "CLIENT")
                .requestMatchers("/api/dashboard/**").authenticated()
                
                // Admin only endpoints
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                .requestMatchers("/api/staff/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                .requestMatchers("/api/reports/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                
                // Receptionist and Admin
                .requestMatchers(HttpMethod.POST, "/api/reservations/**").hasAnyRole("ADMIN", "RECEPTIONIST", "CLIENT")
                .requestMatchers(HttpMethod.PUT, "/api/reservations/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                .requestMatchers(HttpMethod.DELETE, "/api/reservations/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                .requestMatchers("/api/reservations/**").hasAnyRole("ADMIN", "RECEPTIONIST", "CLIENT")
                
                // Rooms - all authenticated users can view
                .requestMatchers(HttpMethod.GET, "/api/rooms/**").authenticated()
                .requestMatchers("/api/rooms/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                
                // Guests - clients can view their own, receptionist/admin can manage
                .requestMatchers(HttpMethod.GET, "/api/guests/**").authenticated()
                .requestMatchers("/api/guests/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                
                // Payments - clients can view their own, admin/receptionist can manage
                .requestMatchers(HttpMethod.GET, "/api/payments/**").authenticated()
                .requestMatchers("/api/payments/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                
                // Services - all can view, admin/receptionist can manage
                .requestMatchers(HttpMethod.GET, "/api/services/**").authenticated()
                .requestMatchers("/api/services/**").hasAnyRole("ADMIN", "RECEPTIONIST")
                
                // Messages - all authenticated users
                .requestMatchers("/api/messages/**").authenticated()
                
                // Timesheets - employees and admin
                .requestMatchers("/api/timesheets/**").hasAnyRole("ADMIN", "RECEPTIONIST", "EMPLOYEE")
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Autowired
    private Environment env;
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Autoriser tous les ports localhost pour le développement
        configuration.addAllowedOriginPattern("http://localhost:*");
        configuration.addAllowedOriginPattern("http://127.0.0.1:*");
        
        // Méthodes autorisées
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        
        // Headers autorisés
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Content-Type");
        
        // Autoriser les credentials
        configuration.setAllowCredentials(true);
        
        // Max age pour le preflight
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}