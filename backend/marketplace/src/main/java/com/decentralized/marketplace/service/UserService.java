package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.UpdateUserDTO;
import com.decentralized.marketplace.dto.UserLoginRequestDTO;
import com.decentralized.marketplace.dto.UserResponseDTO;
import com.decentralized.marketplace.dto.UserSignupRequestDTO;
import org.bson.types.ObjectId;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO);

    UserResponseDTO login(UserLoginRequestDTO userLoginRequestDTO);

    UserResponseDTO getUser(ObjectId userId);

    void deleteUser(ObjectId userId);

    UserResponseDTO updateUser(UpdateUserDTO update, ObjectId userId);

}
