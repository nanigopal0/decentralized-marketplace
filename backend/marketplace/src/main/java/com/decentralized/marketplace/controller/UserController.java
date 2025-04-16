package com.decentralized.marketplace.controller;

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
    public ResponseEntity<UserResponseDTO> getUser(@RequestParam(value = "id")ObjectId userId) {
        try{
            return ResponseEntity.ok(userService.getUser(userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("update")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestBody UpdateUserDTO updateUserDTO, @RequestParam(value = "userId") ObjectId userId) {
        try{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userService.updateUser(updateUserDTO, userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<String > deleteUser(@RequestParam(value = "id")ObjectId userId) {
        try{
            userService.deleteUser(userId);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
