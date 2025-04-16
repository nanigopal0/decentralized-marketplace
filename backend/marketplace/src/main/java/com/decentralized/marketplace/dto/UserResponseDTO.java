package com.decentralized.marketplace.dto;


import com.decentralized.marketplace.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String id;
    private String fullName;
    private String email;
    private String avatar;
    private LocalDateTime createdAt;
    private Role role;
    private String ethereumPublicKey;
}
