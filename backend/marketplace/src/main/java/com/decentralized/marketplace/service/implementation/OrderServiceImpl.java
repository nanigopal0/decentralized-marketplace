package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.entity.Order;
import com.decentralized.marketplace.entity.OrderStatus;
import com.decentralized.marketplace.exception.OrderNotFoundException;
import com.decentralized.marketplace.repository.OrderRepo;
import com.decentralized.marketplace.service.OrderService;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    public OrderServiceImpl(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public Order createOrder(OrderRequestDTO order) {

        /* 1. Pay the ordered amount by blockchain transaction */

        /* 2.
                (i) Digital Product
                    * Add the order to mongodb with status Accepted and blockchain order contract
                    * Notify the seller for the order giving access to the buyer
                    * Seller give access the digital product to the buyer and update the status to Accessed/Shipped and blockchain order contract
                    * Buyer confirm the digital product access by updating the status to Delivered and blockchain order contract.

                (ii) Physical Product
                    * Add the order to mongodb with status Accepted and blockchain order contract
                    * Notify the seller for the order delivering to the buyer
                    * Seller deliver the physical product to the buyer and update the status to Shipped and blockchain order contract
                    * Buyer confirm the physical product by updating the status to Delivered and blockchain order contract.
         */
        Order order1 = Order.builder()
                .sellerId(new ObjectId(order.getSellerId()))
                .buyerId(new ObjectId(order.getBuyerId()))
                .productId(new ObjectId(order.getProductId()))
                .pricePerItem(order.getPricePerItem())
                .orderedAt(LocalDateTime.now())
                .priceUnit(order.getPriceUnit())
                .quantity(order.getQuantity())
                .totalPrice(order.getPricePerItem() * order.getQuantity())
                .status(OrderStatus.Shipped)
                .build();
        return orderRepo.save(order1);
    }

    @Override
    public List<Order> getAllOrderBySellerId(ObjectId sellerId) {

        return orderRepo.findOrderBySellerId(sellerId);

    }

    @Override
    public List<Order> getAllOrderByBuyerId(ObjectId buyerId) {
        return orderRepo.findOrderByBuyerId(buyerId);
    }

    @Override
    public List<Order> getAllOrderByProductId(ObjectId productId) {
        return orderRepo.findOrderByProductId(productId);
    }

    @Override
    public void cancelOrder(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        switch (order.getStatus()){
            case Delivered -> throw new RuntimeException("Order already delivered! ");
            case Cancelled -> throw new RuntimeException("Order already cancelled! ");
        }
        order.setStatus(OrderStatus.Cancelled);
        orderRepo.save(order);
    }

//    @Override
//    public Order updateOrder(OrderRequestDTO order) {
//      return null;
//    }
    @Override
    public Order getOrderById(ObjectId orderId) {
        return orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
    }

    @Override
    public void deleteOrder(ObjectId orderId) {
        orderRepo.deleteById(orderId);
    }

    @Override
    public void deliverOrder(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        switch (order.getStatus()){
            case Delivered -> throw new RuntimeException("Order already delivered! ");
            case Shipped -> order.setStatus(OrderStatus.Delivered);
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted -> throw new RuntimeException("Order is accepted, only shipping or access will be done now! ");
        }
        orderRepo.save(order);
    }

    @Override
    public void shipOrder(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        switch (order.getStatus()){
            case Delivered -> throw new RuntimeException("Order delivered and cannot back to shipped phase! ");
            case Shipped -> throw new RuntimeException("Order already shipped! ");
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted -> order.setStatus(OrderStatus.Shipped);
        }
        orderRepo.save(order);
    }
}
