package com.sathwikhbhat.notspotify.service;

import com.sathwikhbhat.notspotify.document.User;
import com.sathwikhbhat.notspotify.document.UserResponse;
import com.sathwikhbhat.notspotify.dto.RegisterRequest;
import com.sathwikhbhat.notspotify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        User newUser = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .role(User.Role.USER)
                .build();

        userRepository.save(newUser);

        return UserResponse.builder()
                .email(newUser.getEmail())
                .role(UserResponse.Role.USER)
                .build();
    }

}