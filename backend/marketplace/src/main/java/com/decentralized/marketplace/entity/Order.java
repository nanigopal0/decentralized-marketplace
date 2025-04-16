package com.decentralized.marketplace.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private ObjectId id;
    private ObjectId sellerId;
    private ObjectId buyerId;
    private ObjectId productId;
    private Integer quantity;
    private Double pricePerItem;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime orderedAt;
    private String receiptUrl;
    private String priceUnit="ETH";//
    private String transactionHash; //ethereum payment blockchain hash
}
