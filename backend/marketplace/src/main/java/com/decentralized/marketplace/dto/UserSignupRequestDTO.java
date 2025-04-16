package com.decentralized.marketplace.dto;

import com.decentralized.marketplace.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignupRequestDTO extends UserLoginRequestDTO{

    private String fullName;
    private Role role;
    private String ethereumPublicKey;
}
