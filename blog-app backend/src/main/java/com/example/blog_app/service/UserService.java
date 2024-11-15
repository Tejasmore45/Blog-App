package com.example.blog_app.service;

import com.example.blog_app.model.AuthenticationRequest;
import com.example.blog_app.model.Users;
import com.example.blog_app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // Register user method with password encoding
    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword())); // Encode password
        return repo.save(user);
    }

    // Verify user credentials and return JWT
    public String verify(AuthenticationRequest authRequest) {
        try {
            // Authenticate user
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(authRequest.getUsername()); // Return JWT token on success
            }
        } catch (Exception e) {
            // Log and handle authentication failure if needed
        }
        return "fail";
    }
}
