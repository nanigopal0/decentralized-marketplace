package com.decentralized.marketplace.dto;


import java.math.BigDecimal;

public class OrderUpdateDTO {
    private String orderId;
    private Integer quantity;
    private BigDecimal pricePerItem;
    private String priceUnit;
}
