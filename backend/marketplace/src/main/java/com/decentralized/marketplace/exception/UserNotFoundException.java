package com.decentralized.marketplace.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message + "User not found!");
    }

    public UserNotFoundException() {
        super("User not found!");
    }
}
