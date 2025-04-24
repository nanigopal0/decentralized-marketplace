package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import com.decentralized.marketplace.entity.OrderStatus;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface CustomOrderRepo {

    List<BuyerOrderDTO> findAllBuyerOrderWithProductByBuyerId(ObjectId buyerId, Sort sort);
    List<SellerOrderDTO> findAllOrderWithBuyerByProductId(ObjectId productId, Sort sort);
    List<SellerOrderDTO> findAllSellerOrderWithProductBySellerIdAndOrderStatus(ObjectId sellerId, Sort sort, OrderStatus status);
    List<SellerOrderDTO> findAllSellerOrderWithProductBySellerId(ObjectId sellerId, Sort sort);
}
