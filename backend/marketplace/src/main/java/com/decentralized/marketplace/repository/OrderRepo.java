package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.entity.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepo extends MongoRepository<Order, ObjectId> {

    List<Order> findOrderBySellerId(ObjectId sellerId);
    List<Order> findOrderByBuyerId(ObjectId buyerId);
    List<Order> findOrderByProductId(ObjectId productId);
}
