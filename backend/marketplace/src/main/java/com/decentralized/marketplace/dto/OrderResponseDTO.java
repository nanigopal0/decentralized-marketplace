package com.decentralized.marketplace.dto;

import com.decentralized.marketplace.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private String OrderId;
    private String sellerId;
    private String buyerId;
    private String productId;
    private Integer quantity;
    private Double pricePerItem;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime orderedAt;
    private String receiptUrl;
    private String priceUnit = "ETH";
    private String transactionHash;
}
