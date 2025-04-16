package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.entity.Order;
import org.bson.types.ObjectId;

import java.util.List;

public interface OrderService {

    Order createOrder(OrderRequestDTO order);

    List<Order> getAllOrderBySellerId(ObjectId sellerId);

    List<Order> getAllOrderByBuyerId(ObjectId buyerId);

    List<Order> getAllOrderByProductId(ObjectId productId);

    void cancelOrder(ObjectId orderId);

    Order getOrderById(ObjectId orderId);

//    Order updateOrder(OrderRequestDTO order);

    void deleteOrder(ObjectId orderId);

    void deliverOrder(ObjectId orderId);

    void shipOrder(ObjectId orderId);
}
