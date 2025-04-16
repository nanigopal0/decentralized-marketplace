package com.decentralized.marketplace.service;

import com.decentralized.marketplace.entity.CustomUserDetails;
import com.decentralized.marketplace.entity.User;
import com.decentralized.marketplace.exception.UserNotFoundException;
import com.decentralized.marketplace.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepo.findByEmail(username).orElseThrow(() -> new UserNotFoundException(username));

        return new CustomUserDetails(user);
    }
}
