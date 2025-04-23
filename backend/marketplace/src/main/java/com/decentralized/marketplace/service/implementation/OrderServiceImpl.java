package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.contract.service.ContractService;
import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.OrderRequestDTO;
import com.decentralized.marketplace.dto.OrderResponseDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import com.decentralized.marketplace.entity.*;
import com.decentralized.marketplace.exception.*;
import com.decentralized.marketplace.repository.OrderRepo;
import com.decentralized.marketplace.repository.ProductRepo;
import com.decentralized.marketplace.repository.UserRepo;
import com.decentralized.marketplace.service.MailService;
import com.decentralized.marketplace.service.OrderService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;


@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final MailService mailService;
    private final UserRepo userRepo;
    private final Random random = new Random();

    // OTP configuration
    private static final int OTP_EXPIRY_MINUTES = 30;
    private final ProductRepo productRepo;


    public OrderServiceImpl(OrderRepo orderRepo, MailService mailService, UserRepo userRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.mailService = mailService;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
    }

    /**
     * Generates a random numeric OTP of length 6
     *
     * @return The generated OTP as a string
     */
    private String generateOtp() {
        return random.nextInt(100000, 999999) + "";
    }

    /**
     * Sends an OTP verification email
     *
     * @param email                  Recipient's email address
     * @param otp                    The OTP code to send
     * @param order                  The order details
     * @param title                  Email title
     * @param recipientType          Type of recipient (Customer/Seller)
     * @param message                Custom message explaining the purpose of the OTP
     * @param additionalInstructions Any additional instructions for the recipient
     * @throws MessagingException If there's an error sending the email
     */
    private void sendOtpVerificationEmail(
            String email,
            String otp,
            OrderResponseDTO order,
            String title,
            String recipientType,
            String message,
            String additionalInstructions) throws MessagingException {

        Map<String, Object> model = new HashMap<>();
        model.put("otp", otp);
        model.put("order", order);
        model.put("title", title);
        model.put("recipientType", recipientType);
        model.put("message", message);
        model.put("expiryMinutes", OTP_EXPIRY_MINUTES);
        model.put("additionalInstructions", additionalInstructions);

        mailService.sendTemplatedMail(
                email,
                title,
                "otp-verification.ftlh",
                model
        );
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO order) throws MessagingException {
        Product product = productRepo.findById(new ObjectId(order.getProductId())).orElseThrow(() -> new ProductNotFoundException(order.getProductId()));
        if (product.getStock() < order.getQuantity())
            throw new ProductOutOfStockException("Product stock is less than the requested quantity!");
        order.setPriceUnit(order.getPriceUnit() == null ? "ETH" : order.getPriceUnit());
        CustomUserDetails userDetails = UserServiceImpl.getCustomUserDetailsFromAuthentication();
        Order order1 = Order.builder()
                .sellerId(product.getSellerId())
                .buyerId(new ObjectId(userDetails.getUserId()))
                .productId(product.getId())
                .pricePerItem(product.getPrice())
                .orderedAt(LocalDateTime.now())
                .priceUnit(product.getPriceUnit())
                .quantity(order.getQuantity())
                .totalPrice(product.getPrice() * order.getQuantity())
                .status(OrderStatus.Pending)
                .build();
        User seller = userRepo.findById(product.getSellerId()).orElseThrow(() -> new UserNotFoundException(product.getSellerId().toHexString()));

        /* 1. Pay the ordered amount by blockchain transaction */

        /* 2.
                (i) Digital Product
                    1. Add the order to MongoDB with status and record the blockchain order contract. **Accepted**
                    2. Notify the seller that the buyer requests access to the digital product.
                    3. Seller grants the buyer access to the digital product, updating the status to and recording it in the blockchain order contract. **Accessed/Shipped**
                    4. Buyer confirms access to the digital product by updating the status to and recording it in the blockchain order contract **Delivered**

                (ii) Physical Product
                    1. Add the order to MongoDB with status and record the blockchain order contract. **Accepted**
                    2. Notify the seller that a physical product must be delivered to the buyer.
                    3. Seller delivers the physical product, updating the status to and recording it in the blockchain order contract. **Shipped**
                    4. Buyer confirms the physical product by updating the status to and recording it in the blockchain order contract. **Delivered**
        */

        Order saved = orderRepo.save(order1);

        //add product to blockchain
//        contractService.purchaseProduct(saved.getProductId().toHexString(),saved.getId().toHexString(),saved.getTotalPrice());

        OrderResponseDTO orderResponseDTO = convertOrderToOrderResponseDTO(saved);
        //save the stock update
        product.setStock(product.getStock() - order.getQuantity());
        productRepo.save(product);
        // Create a model with the order details
        Map<String, Object> model = new HashMap<>();
        model.put("order", orderResponseDTO);

        String response = mailService.sendTemplatedMail(
                seller.getEmail(),
                "New Order Request",
                "order-notification.ftlh",
                model
        );
        log.info("Order notification email sent to seller: {}", response);

        return orderResponseDTO;
    }


    private OrderResponseDTO convertOrderToOrderResponseDTO(Order order) {
        return OrderResponseDTO.builder()
                .orderedAt(order.getOrderedAt())
                .pricePerItem(order.getPricePerItem())
                .quantity(order.getQuantity())
                .totalPrice(order.getTotalPrice())
                .orderId(order.getId().toHexString())
                .sellerId(order.getSellerId().toHexString())
                .buyerId(order.getBuyerId().toHexString())
                .productId(order.getProductId().toHexString())
                .priceUnit(order.getPriceUnit() == null ? "ETH" : order.getPriceUnit())
                .transactionHash(order.getTransactionHash())
                .receiptUrl(order.getReceiptUrl())
                .status(order.getStatus())
                .build();
    }


    @Override
    public List<SellerOrderDTO> getAllOrderBySellerId(ObjectId sellerId, String sortBy, OrderStatus status) {
        if (status != null)
            return orderRepo.findAllSellerOrderWithProductBySellerIdAndOrderStatus(sellerId, Sort.by(Sort.Direction.DESC, sortBy), status);
        else return orderRepo.findAllSellerOrderWithProductBySellerId(sellerId, Sort.by(Sort.Direction.DESC, sortBy));
    }

    @Override
    public List<BuyerOrderDTO> getAllOrderByBuyerId(ObjectId buyerId, String sortBy) {
        return orderRepo.findAllBuyerOrderWithProductByBuyerId(buyerId, Sort.by(Sort.Direction.DESC, sortBy));
//        return orderRepo.findOrderByBuyerId(buyerId).stream().map(this::convertOrderToOrderResponseDTO).toList();
    }

    @Override
    public List<SellerOrderDTO> getAllOrderByProductId(ObjectId productId) {
//        return orderRepo.findOrderByProductId(productId).stream().map(this::convertOrderToOrderResponseDTO).toList();
        return orderRepo.findAllOrderWithBuyerByProductId(productId,Sort.by(Sort.Direction.DESC,"orderedAt"));
    }

    @Override
    public void cancelOrder(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getBuyerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to cancel this order! only buyer can cancel order");
        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order already delivered! ");
            case Cancelled -> throw new RuntimeException("Order already cancelled! ");
        }
        order.setStatus(OrderStatus.Cancelled);
        orderRepo.save(order);
    }

    @Override
    public OrderResponseDTO getOrderById(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        return convertOrderToOrderResponseDTO(order);
    }

    @Override
    public void deleteOrder(ObjectId orderId) {
        orderRepo.deleteById(orderId);
    }

    private Order deliverOrder(Order order) {
        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order already delivered! ");
            case Shipped -> {
                if(order.getDeliveryOtpVerified()) {
                    order.setStatus(OrderStatus.Delivered);
                    return orderRepo.save(order);
                }else throw new RuntimeException("Delivery otp not verified!");
            }
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted ->
                    throw new RuntimeException("Order is accepted, only shipping or access will be done now! ");
            default -> throw new RuntimeException("Order status not supported! ");
        }
    }

    @Override
    public void generateDeliveryOtp(ObjectId orderId) throws MessagingException {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getBuyerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to deliver this order! only buyer can update the status to Delivered.");

        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order already delivered! ");
            case Shipped -> {
                // Verify that the seller's shipment OTP is valid
                if (order.getShipmentOtp() == null || order.getShipmentOtpExpiry() == null ||
                        LocalDateTime.now().isAfter(order.getShipmentOtpExpiry())) {
                    throw new RuntimeException("Shipment verification code is missing or expired. Please contact the seller.");
                }
                User buyer = userRepo.findById(order.getBuyerId()).orElseThrow(() -> new UserNotFoundException(order.getBuyerId().toHexString()));
                // Generate OTP for delivery confirmation
                String deliveryOtp = generateOtp();
                order.setDeliveryOtp(deliveryOtp);
                order.setDeliveryOtpExpiry(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
                order.setDeliveryOtpVerified(false);
                orderRepo.save(order);
                // Send OTP verification email to the buyer
                sendOtpVerificationEmail(
                        buyer.getEmail(),
                        deliveryOtp,
                        convertOrderToOrderResponseDTO(order),
                        "Delivery Verification Code",
                        Role.BUYER.name(),
                        "You have confirmed delivery of your order. Please use the verification code below to complete the delivery process.",
                        "You will need to provide this code to the seller to verify the delivery."
                );
            }
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted ->
                    throw new RuntimeException("Order is accepted, only shipping or access will be done now! ");
        }
    }


    private Order shipOrder(Order order) {
        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order delivered and cannot back to shipped phase! ");
            case Shipped -> throw new RuntimeException("Order already shipped! ");
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted -> {
                order.setStatus(OrderStatus.Shipped);
                return orderRepo.save(order);
            }
            default -> throw new RuntimeException("Order status not supported! ");
        }
    }

    @Override
    public void generateShipmentOtp(ObjectId orderId) throws MessagingException {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getSellerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to ship this order! Only seller can ship");

        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order delivered and cannot back to shipped phase! ");
            case Shipped -> throw new RuntimeException("Order already shipped! ");
            case Cancelled -> throw new RuntimeException("Order is cancelled and not deliverable! ");
            case Accepted -> {
                User seller = userRepo.findById(order.getSellerId()).orElseThrow(() -> new UserNotFoundException(order.getSellerId().toHexString()));
                // Generate OTP for shipment verification
                String shipmentOtp = generateOtp();
                order.setShipmentOtp(shipmentOtp);
                order.setShipmentOtpExpiry(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
                order.setShipmentOtpVerified(false);
                orderRepo.save(order);
                // Send OTP verification email to seller
                sendOtpVerificationEmail(
                        seller.getEmail(),
                        shipmentOtp,
                        convertOrderToOrderResponseDTO(order),
                        "Shipment Verification Code",
                        Role.SELLER.name(),
                        "You have marked an order as shipped. Please use the verification code below when the buyer confirms delivery.",
                        "Keep this code safe. The buyer will need to provide this code to confirm delivery."
                );
                log.info("Shipment OTP sent to seller: {}", seller.getEmail());
            }
        }
    }



    @Override
    public boolean verifyShipmentOtp(ObjectId orderId, String otp) throws MessagingException {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getSellerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to ship this order! Only seller can ship");

        order.setShipmentOtpVerified(verifyOtp(otp,order.getShipmentOtpExpiry(),order.getShipmentOtp(),orderId.toHexString(),"Shipment"));

        order = shipOrder(order);

        sendShipmentMailToBuyer(order);
        log.info("Shipment OTP verified successfully for order: {}", orderId);
        return true;
    }

    private void sendShipmentMailToBuyer(Order order) throws MessagingException {
        User buyer = userRepo.findById(order.getBuyerId()).orElseThrow(() -> new UserNotFoundException(order.getBuyerId().toHexString()));
        Map<String, Object> buyerModel = new HashMap<>();
        buyerModel.put("order", convertOrderToOrderResponseDTO(order));
        mailService.sendTemplatedMail(
                buyer.getEmail(),
                "Your Order Has Been Shipped",
                "shipment-notification.ftlh",
                buyerModel
        );
    }

    @Override
    public boolean verifyDeliveryOtp(ObjectId orderId, String otp) throws MessagingException {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getBuyerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to deliver this order! only buyer can update the status to Delivered.");

        order.setDeliveryOtpVerified(verifyOtp(otp,order.getDeliveryOtpExpiry(),order.getDeliveryOtp(),orderId.toHexString(),"Delivery"));
        order = deliverOrder(order);

        sendDeliveryMailToSeller(order);
        log.info("Delivery OTP verified successfully for order: {}", orderId);
        return true;
    }

    @Override
    public void acceptOrder(ObjectId id, String txHash) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new OrderNotFoundException(id.toString()));
        order.setTransactionHash(txHash);
        order.setStatus(OrderStatus.Accepted);
        orderRepo.save(order);
    }

    @Override
    public void generateCancelOTP(ObjectId orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId.toString()));
        if (!Objects.equals(order.getSellerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You are not allowed to cancel this order! Only buyer can cancel");

        switch (order.getStatus()) {
            case Delivered -> throw new RuntimeException("Order delivered and cannot back to cancel phase! ");
            case Shipped -> throw new RuntimeException("Order already shipped! ");
            case Cancelled -> throw new RuntimeException("Order is cancelled and not cancellable again! ");
            case Accepted, Pending -> {

            }
        }
    }

    private boolean verifyOtp(String otp, LocalDateTime otpExpiredAt, String expectedOtp,String orderId,String otpMode)  {
        // Check if OTP exists and is not expired
        if (expectedOtp == null || otpExpiredAt== null) {
            log.warn("{} OTP not found for order: {}", otpMode, orderId);
            throw new InvalidOTPException(otpMode+" OTP not found for order: " + orderId);
        }
        if (LocalDateTime.now().isAfter(otpExpiredAt)) {
            log.warn("{} OTP expired for order: {}", otpMode, orderId);
            throw new InvalidOTPException(otpMode+" OTP expired for order: " + orderId);
        }
        // Check if OTP matches
        if (!expectedOtp.equals(otp)) {
            log.warn("Invalid {} OTP provided for order: {}", otpMode, orderId);
            throw new InvalidOTPException("Invalid "+otpMode+" OTP provided for order: " + orderId);
        }
        return true;
    }

    private void sendDeliveryMailToSeller(Order order) throws MessagingException {
        User seller = userRepo.findById(order.getSellerId()).orElseThrow(() -> new UserNotFoundException(order.getSellerId().toHexString()));
        Map<String, Object> sellerModel = new HashMap<>();
        sellerModel.put("order", convertOrderToOrderResponseDTO(order));

        mailService.sendTemplatedMail(
                seller.getEmail(),
                "Order Delivery Confirmation",
                "delivery-confirmation.ftlh",
                sellerModel
        );
    }

}
