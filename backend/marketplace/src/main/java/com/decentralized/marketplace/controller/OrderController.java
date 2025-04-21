package com.decentralized.marketplace.controller;


import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.dto.OrderResponseDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import com.decentralized.marketplace.service.OrderService;
import jakarta.mail.MessagingException;
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

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("create")
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO order) throws MessagingException {
        return ResponseEntity.accepted().body(orderService.createOrder(order));
    }


    @GetMapping("get-by-sellerId")
    public ResponseEntity<List<SellerOrderDTO>> getAllOrdersBySellerId(@RequestParam(value = "sellerId") ObjectId sellerId,
                                                                       @RequestParam(value = "sortBy", defaultValue = "orderedAt", required = false) String sortBy) {
        return ResponseEntity.ok(orderService.getAllOrderBySellerId(sellerId, sortBy));
    }

    @GetMapping("get-by-buyerId")
    public ResponseEntity<List<BuyerOrderDTO>> getAllOrdersByBuyerId(@RequestParam(value = "buyerId") ObjectId buyerId,
                                                                     @RequestParam(value = "sortBy", defaultValue = "orderedAt", required = false) String sortBy) {
        return ResponseEntity.ok(orderService.getAllOrderByBuyerId(buyerId, sortBy));
    }


    @GetMapping("get-by-productId")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdersByProductId(@RequestParam(value = "ProductId") ObjectId ProductId) {
        return ResponseEntity.ok(orderService.getAllOrderByProductId(ProductId));
    }

    @GetMapping("get")
    public ResponseEntity<OrderResponseDTO> getOrder(@RequestParam(value = "orderId") ObjectId id) {

        return ResponseEntity.ok(orderService.getOrderById(id));

    }

    @PutMapping("cancel")
    public ResponseEntity<String> cancelOrder(@RequestParam(value = "orderId") ObjectId orderId) {

        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("deliver-otp")
    public ResponseEntity<String> generateDeliveryOTP(@RequestParam(value = "orderId") ObjectId id) throws MessagingException {
        orderService.generateDeliveryOtp(id);
        return ResponseEntity.noContent().build();
    }

    //Verify the delivery Otp and update the status of the order to Delivered
    @PutMapping("verify-deliver-otp")
    public ResponseEntity<String> verifyDeliveryOtpAndDeliver(@RequestParam(value = "orderId") ObjectId id, @RequestParam(value = "otp") String otp) throws MessagingException {
        if (orderService.verifyDeliveryOtp(id, otp))
            return ResponseEntity.noContent().build();
        else return ResponseEntity.badRequest().body("Invalid OTP");
    }

    @PutMapping("shipment-otp")
    public ResponseEntity<String> generateShipmentOtp(@RequestParam(value = "orderId") ObjectId id) throws MessagingException {
        orderService.generateShipmentOtp(id);
        return ResponseEntity.noContent().build();
    }

    //Verify the shipment Otp and ship the order
    @PutMapping("verify-shipment-otp")
    public ResponseEntity<String> verifyShipmentOtpAndShip(@RequestParam(value = "orderId") ObjectId id, @RequestParam(value = "otp") String otp) throws MessagingException {

        if (orderService.verifyShipmentOtp(id, otp))
            return ResponseEntity.noContent().build();
        else return ResponseEntity.badRequest().body("Invalid OTP");

    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteOrder(@RequestParam(value = "orderId") ObjectId id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();

    }

}
