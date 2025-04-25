package com.decentralized.marketplace.dto;

import com.decentralized.marketplace.entity.OrderStatus;
import com.decentralized.marketplace.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

//Buyer order history
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyerOrderDTO {
    private String productTitle;
    private String productMediaUrl;
    private String productId;
    private String orderId;
    private PublicUserProfileDTO seller;
    private Integer quantity;
    private BigDecimal pricePerItem;
    private BigDecimal totalPrice;
    private OrderStatus orderStatus;
    private ProductType productType;
    private String transactionHash;
    private LocalDateTime orderedAt;
}
