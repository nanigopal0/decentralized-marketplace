package com.decentralized.marketplace.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "products")
public class Product {
    @Id
    private ObjectId id;
    @Indexed(direction = IndexDirection.ASCENDING)
    private String title;
    private String description;
    private BigDecimal price;
    private ProductType type;
    private String priceUnit; //asset
    private String mediaUrl;
    private ObjectId sellerId;
    private Integer stock;
    private LocalDateTime createdAt;
}
