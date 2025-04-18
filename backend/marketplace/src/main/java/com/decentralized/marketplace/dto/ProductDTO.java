package com.decentralized.marketplace.dto;

import com.decentralized.marketplace.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private String productId;
    private String title;
    private String description;
    private Double price;
    private ProductType type;
    private String priceUnit; //asset
    private String mediaUrl;
    private String sellerId;
    private Integer stock;
    private LocalDateTime createdAt;
}
