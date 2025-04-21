package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface CustomOrderRepo {

    List<BuyerOrderDTO> findAllBuyerOrderWithProductByBuyerId(ObjectId buyerId, Sort sort);

    List<SellerOrderDTO> findAllSellerPendingOrderWithProductBySellerId(ObjectId sellerId, Sort sort);
}
