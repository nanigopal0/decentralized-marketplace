package com.decentralized.marketplace.entity;

import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public String getUserFullName(){
        return user.getFullName();
    }
    public String getUserEthereumPublicKey(){
        return user.getEthereumPublicKey();
    }

    public String getUserAvatar(){
        return user.getAvatar();
    }

    public String getUserId(){
        return user.getId().toHexString();
    }

    public Role getRole(){
        return user.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }
}
