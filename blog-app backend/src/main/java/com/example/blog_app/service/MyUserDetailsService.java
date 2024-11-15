package com.example.blog_app.service;

import com.example.blog_app.model.UserPrincipal;
import com.example.blog_app.model.Users;
import com.example.blog_app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Get the user wrapped in Optional
        Optional<Users> optionalUser = userRepo.findByUsername(username);

        // If user is not found, throw an exception
        if (optionalUser.isEmpty()) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("User not found");
        }

        // Return the UserPrincipal object, using the user from the Optional
        return new UserPrincipal(optionalUser.get());
    }
}
