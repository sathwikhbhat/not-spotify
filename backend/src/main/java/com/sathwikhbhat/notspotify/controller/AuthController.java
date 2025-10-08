package com.sathwikhbhat.notspotify.controller;

import com.sathwikhbhat.notspotify.document.User;
import com.sathwikhbhat.notspotify.dto.AuthRequest;
import com.sathwikhbhat.notspotify.dto.AuthResponse;
import com.sathwikhbhat.notspotify.dto.RegisterRequest;
import com.sathwikhbhat.notspotify.service.AppUserDetailService;
import com.sathwikhbhat.notspotify.service.UserService;
import com.sathwikhbhat.notspotify.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailService appUserDetailService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(), authRequest.getPassword()));

            UserDetails userDetails = appUserDetailService.loadUserByUsername(authRequest.getEmail());
            User existingUser = userService.findByEmail(authRequest.getEmail());

            String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());

            return new ResponseEntity<>(
                    new AuthResponse(token, authRequest.getEmail(), existingUser.getRole().name()),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return new ResponseEntity<>(userService.registerUser(request), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}