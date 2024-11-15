package com.example.blog_app.controller;

import com.example.blog_app.dto.UserDTO;
import com.example.blog_app.model.AuthenticationRequest;
import com.example.blog_app.model.AuthenticationResponse;
import com.example.blog_app.model.Users;
import com.example.blog_app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        // Authenticate and generate token
        String token = userService.verify(authenticationRequest);
        if ("fail".equals(token)) {
            return ResponseEntity.status(401).body(new AuthenticationResponse("Authentication failed"));
        }
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody Users user) {
        if (userService.register(user) != null) {
            return ResponseEntity.status(201).body("User registered successfully.");
        }
        return ResponseEntity.status(400).body("User registration failed.");
    }
}
