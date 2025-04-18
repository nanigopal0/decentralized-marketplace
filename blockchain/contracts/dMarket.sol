// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SmartMarketplace {
    enum ProductType { Physical, Digital }
    enum OrderStatus { Pending, Accepted, Shipped, Delivered, Refunded }

    struct Product {
        uint256 id;
        address payable seller;
        uint256 price;
        ProductType productType;
    }

    struct Order {
        uint256 orderId;
        address buyer;
        uint256 productId;
        OrderStatus status;
        uint256 createdAt;
        uint256 shippedAt;
    }

    uint256 public nextProductId = 1;
    uint256 public nextOrderId = 1;

    mapping(uint256 => Product) public products;
    mapping(uint256 => Order) public orders;
    mapping(uint256 => uint256) public escrow; // orderId => amount

    uint256 public shippingTimeout = 3 days;
    uint256 public deliveryTimeout = 5 days;

    event ProductListed(uint256 indexed productId, address indexed seller, uint256 price, ProductType productType);
    event ProductPurchased(uint256 indexed orderId, address indexed buyer, uint256 productId, uint256 amount);
    event OrderAccepted(uint256 indexed orderId, address seller);
    event ProductShipped(uint256 indexed orderId);
    event ProductDelivered(uint256 indexed orderId);
    event Refunded(uint256 indexed orderId, address buyer);

    modifier onlySeller(uint256 orderId) {
        require(msg.sender == products[orders[orderId].productId].seller, "Not product seller");
        _;
    }

    modifier onlyBuyer(uint256 orderId) {
        require(msg.sender == orders[orderId].buyer, "Not the buyer");
        _;
    }

    function listProduct(uint256 price, ProductType productType) external {
        products[nextProductId] = Product({
            id: nextProductId,
            seller: payable(msg.sender),
            price: price,
            productType: productType
        });

        emit ProductListed(nextProductId, msg.sender, price, productType);
        nextProductId++;
    }

    function purchaseProduct(uint256 productId) external payable {
        Product memory product = products[productId];
        require(product.price > 0, "Product doesn't exist");
        require(msg.value == product.price, "Incorrect ETH sent");

        uint256 currentOrderId = nextOrderId++;

        escrow[currentOrderId] = msg.value;

        orders[currentOrderId] = Order({
            orderId: currentOrderId,
            buyer: msg.sender,
            productId: productId,
            status: OrderStatus.Accepted,
            createdAt: block.timestamp,
            shippedAt: 0
        });

        emit ProductPurchased(currentOrderId, msg.sender, productId, msg.value);
        emit OrderAccepted(currentOrderId, product.seller);
    }

    // Backend calls this after OTP verification that seller accepted the order
    function confirmShipment(uint256 orderId) external onlySeller(orderId) {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Accepted, "Order not accepted or already shipped");
        order.status = OrderStatus.Shipped;
        order.shippedAt = block.timestamp;

        emit ProductShipped(orderId);
    }

    // Backend calls this after OTP verification that buyer confirmed delivery
    function confirmDelivery(uint256 orderId) external onlyBuyer(orderId) {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Shipped, "Order not yet shipped");

        order.status = OrderStatus.Delivered;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;
        Product memory product = products[order.productId];

        product.seller.transfer(amount);
        emit ProductDelivered(orderId);
    }

    // Anyone can trigger refund if seller didn’t ship in time
    function refundIfNotShipped(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Accepted, "Order not in accepted state");
        require(block.timestamp > order.createdAt + shippingTimeout, "Shipping timeout not reached");

        order.status = OrderStatus.Refunded;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;

        payable(order.buyer).transfer(amount);
        emit Refunded(orderId, order.buyer);
    }

    // Anyone can trigger auto-release to seller if buyer doesn't confirm delivery
    function releaseIfNotConfirmed(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Shipped, "Order not shipped");
        require(block.timestamp > order.shippedAt + deliveryTimeout, "Delivery timeout not reached");

        order.status = OrderStatus.Delivered;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;

        Product memory product = products[order.productId];
        product.seller.transfer(amount);
        emit ProductDelivered(orderId);
    }

    // Optional helper
    function getOrder(uint256 orderId) external view returns (
        address buyer,
        address seller,
        uint256 productId,
        uint256 price,
        ProductType productType,
        OrderStatus status,
        uint256 createdAt,
        uint256 shippedAt
    ) {
        Order memory order = orders[orderId];
        Product memory product = products[order.productId];
        return (
            order.buyer,
            product.seller,
            order.productId,
            product.price,
            product.productType,
            order.status,
            order.createdAt,
            order.shippedAt
        );
    }
}
