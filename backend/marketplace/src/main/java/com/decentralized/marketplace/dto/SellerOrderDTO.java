package com.decentralized.marketplace.dto;


import com.decentralized.marketplace.entity.OrderStatus;
import com.decentralized.marketplace.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Double pricePerItem;
    private Double totalPrice;
    private String transactionHash;
    private String orderedAt;
    private ProductType productType;
    private OrderStatus orderStatus;
}


