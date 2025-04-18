package com.decentralized.marketplace.exception;

public class UnauthorizedUserException extends RuntimeException {
  public UnauthorizedUserException(String message) {
    super(message);
  }
}
