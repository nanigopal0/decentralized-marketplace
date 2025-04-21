package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.dto.OrderResponseDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import jakarta.mail.MessagingException;
import org.bson.types.ObjectId;

import java.util.List;

public interface OrderService {

    OrderResponseDTO createOrder(OrderRequestDTO order) throws MessagingException;

    List<SellerOrderDTO> getAllOrderBySellerId(ObjectId sellerId,String sortBy);

    List<BuyerOrderDTO> getAllOrderByBuyerId(ObjectId buyerId,String sortBy);

    List<OrderResponseDTO> getAllOrderByProductId(ObjectId productId);

    void cancelOrder(ObjectId orderId);

    OrderResponseDTO getOrderById(ObjectId orderId);

//    Order updateOrder(OrderRequestDTO order);

    void deleteOrder(ObjectId orderId);

//    void deliverOrder(ObjectId orderId) throws MessagingException;

//    void shipOrder(ObjectId orderId) throws MessagingException;

    void generateShipmentOtp(ObjectId orderId) throws MessagingException;

    void generateDeliveryOtp(ObjectId orderId) throws MessagingException;

    /**
     * Verifies the shipment OTP provided by the seller
     *
     * @param orderId The ID of the order
     * @param otp     The OTP to verify
     * @return true if the OTP is valid, false otherwise
     */
    boolean verifyShipmentOtp(ObjectId orderId, String otp) throws MessagingException;

    /**
     * Verifies the delivery OTP provided by the buyer
     *
     * @param orderId The ID of the order
     * @param otp     The OTP to verify
     * @return true if the OTP is valid, false otherwise
     */
    boolean verifyDeliveryOtp(ObjectId orderId, String otp) throws MessagingException;
}
