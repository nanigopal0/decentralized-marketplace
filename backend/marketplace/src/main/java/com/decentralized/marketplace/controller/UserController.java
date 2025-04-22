package com.decentralized.marketplace.controller;

import com.decentralized.marketplace.dto.SellerDashboardInfoDTO;
import com.decentralized.marketplace.dto.UpdateUserDTO;
import com.decentralized.marketplace.dto.UserResponseDTO;
import com.decentralized.marketplace.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("get")
    public ResponseEntity<UserResponseDTO> getUser(@RequestParam(value = "id") ObjectId userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @PutMapping("update")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestBody UpdateUserDTO updateUserDTO, @RequestParam(value = "userId") ObjectId userId) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userService.updateUser(updateUserDTO, userId));
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteUser(@RequestParam(value = "id") ObjectId userId) {
        userService.deleteUser(userId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("logout")
    public ResponseEntity<String> logout() {
        userService.logout();
        return ResponseEntity.accepted().body("Logout successful!");
    }

    @GetMapping("ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Ping successful!");
    }

    @GetMapping("seller-info")
    public ResponseEntity<SellerDashboardInfoDTO> getSellerInfoInDashboard(@RequestParam(value = "userId") ObjectId userId) {
        return ResponseEntity.ok(userService.getSellerDashboardInfo(userId));

    }
}
