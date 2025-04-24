package com.decentralized.marketplace.exception;

public class ProductOutOfStockException extends RuntimeException {
    public ProductOutOfStockException(String message) {
        super(message + " Product out of stock!");
    }
    public ProductOutOfStockException() {
        super("Product out of stock!");
    }
}
