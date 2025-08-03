package com.decentralized.marketplace.controller;

import com.decentralized.marketplace.dto.UserLoginRequestDTO;
import com.decentralized.marketplace.dto.UserResponseDTO;
import com.decentralized.marketplace.dto.UserSignupRequestDTO;
import com.decentralized.marketplace.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    private final UserService userService;

    public PublicController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequestDTO userSignupRequestDTO) {

        userService.signup(userSignupRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Signup Successful");

    }

    @PostMapping("login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginRequestDTO userLoginRequestDTO) {
        return ResponseEntity.ok(userService.login(userLoginRequestDTO));

    }
}
