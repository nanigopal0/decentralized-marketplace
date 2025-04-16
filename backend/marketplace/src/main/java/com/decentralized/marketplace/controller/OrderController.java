package com.decentralized.marketplace.controller;


import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.entity.Order;
import com.decentralized.marketplace.repository.OrderRepo;
import com.decentralized.marketplace.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("order")
public class OrderController {

    private final OrderService orderService;

    public OrderController( OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO order) {
        try{
            return ResponseEntity.accepted().body(orderService.createOrder(order));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("get-by-sellerId")
    public ResponseEntity<List<Order>> getAllOrdersBySellerId(@RequestParam(value = "sellerId") ObjectId sellerId) {
        try{
            return ResponseEntity.ok(orderService.getAllOrderBySellerId(sellerId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-by-buyerId")
    public ResponseEntity<List<Order>> getAllOrdersByBuyerId(@RequestParam(value = "buyerId") ObjectId buyerId) {
        try{
            return ResponseEntity.ok(orderService.getAllOrderByBuyerId(buyerId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("get-by-productId")
    public ResponseEntity<List<Order>> getAllOrdersByProductId(@RequestParam(value = "ProductId") ObjectId ProductId) {
        try{
            return ResponseEntity.ok(orderService.getAllOrderByProductId(ProductId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get")
    public ResponseEntity<Order> getOrder(@RequestParam(value = "orderId") ObjectId id) {
        try{
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("cancel")
    public ResponseEntity<String> cancelOrder(@RequestParam(value = "orderId") ObjectId orderId) {
        try{
            orderService.cancelOrder(orderId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("deliver")
    public ResponseEntity<String > deliverOrder(@RequestParam(value = "orderId") ObjectId id) {
        try{
            orderService.deliverOrder(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("ship")
    public ResponseEntity<String > ship(@RequestParam(value = "orderId") ObjectId id) {
        try{
            orderService.shipOrder(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteOrder(@RequestParam(value = "orderId") ObjectId id) {
        try{
            orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
