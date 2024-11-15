package com.example.blog_app.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private final Users user;

    public UserPrincipal(Users user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Assuming the user has a role, you can add more roles if your application supports them
        return Collections.singleton(new SimpleGrantedAuthority("USER"));  // Example role, modify as needed
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Can be modified if you have expiration logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Can be modified if you have lockout logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Can be modified if you have credentials expiration logic
    }

    @Override
    public boolean isEnabled() {
        return true;  // Can be modified if you have status checks (e.g. active/inactive users)
    }

    public Users getUser() {
        return user;
    }
}
