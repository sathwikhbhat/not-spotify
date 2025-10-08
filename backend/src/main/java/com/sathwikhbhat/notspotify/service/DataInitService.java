package com.sathwikhbhat.notspotify.service;

import com.sathwikhbhat.notspotify.document.User;
import com.sathwikhbhat.notspotify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataInitService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminUserIfNotExists();
    }

    private void createDefaultAdminUserIfNotExists() {
        if (Boolean.FALSE.equals(userRepository.existsByEmail("admin@not-spotify.com"))) {
            User adminUser = User.builder().email("admin@not-spotify.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(adminUser);
            log.info("Default admin user created with email=admin@not-spotify.com, password=admin123");
        } else {
            log.info("Default admin user already exists");
        }
    }

}