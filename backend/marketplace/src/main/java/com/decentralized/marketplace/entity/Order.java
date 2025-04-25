package com.decentralized.marketplace.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
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
    private BigDecimal pricePerItem;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private LocalDateTime orderedAt;
    private String receiptUrl;
    private String priceUnit="ETH";//
    private String transactionHash; //ethereum payment blockchain hash

    // OTP verification fields
    private String deliveryOtp; // OTP for delivery confirmation
    private LocalDateTime deliveryOtpExpiry; // When the delivery OTP expires
    private Boolean deliveryOtpVerified = false; // Whether the delivery OTP has been verified

    private String shipmentOtp; // OTP for shipment confirmation
    private LocalDateTime shipmentOtpExpiry; // When the shipment OTP expires
    private Boolean shipmentOtpVerified = false; // Whether the shipment OTP has been verified
}
