package com.decentralized.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SellerDashboardInfoDTO {
    private String sellerId;
    private Integer totalProducts;
    private Double totalEarnings;
    private Integer totalOrders;
    private Integer totalPendingOrders;
    private Integer totalDeliveredOrders;
    private Integer totalCancelledOrders;
}
