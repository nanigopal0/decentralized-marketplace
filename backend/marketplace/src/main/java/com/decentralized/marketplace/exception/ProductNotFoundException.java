package com.decentralized.marketplace.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Product not found!");
    }

    public ProductNotFoundException(String message) {
        super(message + " Product not found!");
    }
}
