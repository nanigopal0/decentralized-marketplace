package com.decentralized.marketplace.exception;

import org.bson.types.ObjectId;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Product not found!");
    }
    public ProductNotFoundException(String message) {
        super(message+ " Product not found!");
    }
}
