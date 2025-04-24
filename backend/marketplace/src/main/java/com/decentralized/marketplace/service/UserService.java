package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.*;
import com.decentralized.marketplace.entity.CustomUserDetails;
import org.bson.types.ObjectId;

import java.util.Map;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO);

    UserResponseDTO login(UserLoginRequestDTO userLoginRequestDTO);

    UserResponseDTO getUser(ObjectId userId);

    void deleteUser(ObjectId userId);

    UserResponseDTO updateUser(UpdateUserDTO update, ObjectId userId);

    void logout();

    SellerDashboardInfoDTO getSellerDashboardInfo(ObjectId userId);

}
