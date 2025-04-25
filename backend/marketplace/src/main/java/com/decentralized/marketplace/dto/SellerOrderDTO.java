package com.decentralized.marketplace.dto;


import com.decentralized.marketplace.entity.OrderStatus;
import com.decentralized.marketplace.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

//seller order request
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SellerOrderDTO {
    private String productTitle;
    private String productMediaUrl;
    private String productId;
    private String orderId;
    private PublicUserProfileDTO buyer;
    private Integer quantity;
    private BigDecimal pricePerItem;
    private BigDecimal totalPrice;
    private String transactionHash;
    private LocalDateTime orderedAt;
    private ProductType productType;
    private OrderStatus orderStatus;
}


