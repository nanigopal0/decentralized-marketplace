package com.decentralized.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProduct {
    private String productId;
    private String title;
    private String description;
    private BigDecimal price;
    private String mediaUrl;
    private Integer stock;
}
