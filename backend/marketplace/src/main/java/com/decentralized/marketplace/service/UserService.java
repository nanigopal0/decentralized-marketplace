package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.UpdateUserDTO;
import com.decentralized.marketplace.dto.UserLoginRequestDTO;
import com.decentralized.marketplace.dto.UserResponseDTO;
import com.decentralized.marketplace.dto.UserSignupRequestDTO;
import com.decentralized.marketplace.entity.CustomUserDetails;
import org.bson.types.ObjectId;

import java.util.Map;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO);

    Map<String ,Object> login(UserLoginRequestDTO userLoginRequestDTO);

    UserResponseDTO getUser(ObjectId userId);

    void deleteUser(ObjectId userId);

    UserResponseDTO updateUser(UpdateUserDTO update, ObjectId userId);

}
