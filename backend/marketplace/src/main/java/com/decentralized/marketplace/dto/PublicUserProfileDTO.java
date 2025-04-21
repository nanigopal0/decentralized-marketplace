package com.decentralized.marketplace.dto;


import com.decentralized.marketplace.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PublicUserProfileDTO {
    private String userId;
    private String fullName;
    private String email;
    private String avatar;
    private Role role;
}
