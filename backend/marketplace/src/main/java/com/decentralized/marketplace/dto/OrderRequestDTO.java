package com.decentralized.marketplace.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequestDTO {
    private String sellerId;
    private String  buyerId;
    private String  productId;
    private Integer quantity;
    private Double pricePerItem;
    private String priceUnit = "ETH";

}
