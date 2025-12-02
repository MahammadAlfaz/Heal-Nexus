package com.healthcare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Handle the composite username "email:userType" from our modified AuthController
        String[] parts = email.split(":", 2);
        User user;
        if (parts.length == 2) {
            user = userRepository.findByEmailAndUserType(parts[0], parts[1])
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + parts[0] + " and type: " + parts[1]));
        } else {
            // This service requires a composite key "email:userType" to function correctly
            // because emails are not unique across user types.
            throw new UsernameNotFoundException("Ambiguous user lookup. Please provide user in 'email:userType' format.");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getUserType() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getUserType().toUpperCase()));
        }

        return new org.springframework.security.core.userdetails.User(
            user.getEmail() + ":" + user.getUserType(),
            user.getPasswordHash(),
            authorities
        );
    }
}
