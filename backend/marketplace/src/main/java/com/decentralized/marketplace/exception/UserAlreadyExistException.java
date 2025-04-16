package com.decentralized.marketplace.exception;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(){
        super("User already exists!");
    }
    public UserAlreadyExistException(String message) {
        super(message+ "User already exists!");
    }
}
