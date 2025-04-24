package com.decentralized.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProduct {
    private String productId;
    private String title;
    private String description;
    private Double price;
    private String mediaUrl;
    private Integer stock;
}
