// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SmartMarketplace {
    enum ProductType {
        Physical,
        Digital
    }
    enum OrderStatus {
        Pending,
        Accepted,
        Shipped,
        Delivered,
        Refunded
    }

    struct Product {
        string id;
        address payable seller;
        uint256 price;
        ProductType productType;
    }

    struct Order {
        string orderId;
        address buyer;
        string productId;
        OrderStatus status;
        uint256 createdAt;
        uint256 shippedAt;
    }

    mapping(string => Product) public products;
    mapping(string => Order) public orders;
    mapping(string => uint256) public escrow; // orderId => amount

    uint256 public shippingTimeout = 1 minutes;
    uint256 public deliveryTimeout = 1 minutes;

    event ProductListed(
        string indexed productId,
        address indexed seller,
        uint256 price,
        ProductType productType
    );
    event ProductPurchased(
        string indexed orderId,
        address indexed buyer,
        string productId,
        uint256 amount
    );
    event OrderAccepted(string indexed orderId, address seller);
    event ProductShipped(string indexed orderId);
    event ProductDelivered(string indexed orderId);
    event Refunded(string indexed orderId, address buyer);

    modifier onlySeller(string memory orderId) {
        require(
            msg.sender == products[orders[orderId].productId].seller,
            "Not product seller"
        );
        _;
    }

    modifier onlyBuyer(string memory orderId) {
        require(msg.sender == orders[orderId].buyer, "Not the buyer");
        _;
    }

    function listProduct(
        string memory productId,
        uint256 price,
        ProductType productType
    ) external {
        products[productId] = Product({
            id: productId,
            seller: payable(msg.sender),
            price: price,
            productType: productType
        });

        emit ProductListed(productId, msg.sender, price, productType);
    }

    function purchaseProduct(
        string memory productId,
        string memory orderId
    ) external payable {
        Product memory product = products[productId];
        string memory currentOrderId = orderId;
        require(product.price > 0, "Product doesn't exist");
        require(msg.value == product.price, "Incorrect ETH sent");
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

    function confirmShipment(
        string memory orderId
    ) external onlySeller(orderId) {
        Order storage order = orders[orderId];
        require(
            order.status == OrderStatus.Accepted,
            "Order not accepted or already shipped"
        );
        order.status = OrderStatus.Shipped;
        order.shippedAt = block.timestamp;

        emit ProductShipped(orderId);
    }

    function confirmDelivery(
        string memory orderId
    ) external onlyBuyer(orderId) {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Shipped, "Order not yet shipped");

        order.status = OrderStatus.Delivered;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;
        Product memory product = products[order.productId];

        product.seller.transfer(amount);
        emit ProductDelivered(orderId);
    }

    function refundIfNotShipped(string memory orderId) external {
        Order storage order = orders[orderId];
        require(
            order.status == OrderStatus.Accepted,
            "Order not in accepted state"
        );
        require(
            block.timestamp > order.createdAt + shippingTimeout,
            "Shipping timeout not reached"
        );

        order.status = OrderStatus.Refunded;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;

        payable(order.buyer).transfer(amount);
        emit Refunded(orderId, order.buyer);
    }

    function releaseIfNotConfirmed(string memory orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Shipped, "Order not shipped");
        require(
            block.timestamp > order.shippedAt + deliveryTimeout,
            "Delivery timeout not reached"
        );

        order.status = OrderStatus.Delivered;
        uint256 amount = escrow[orderId];
        escrow[orderId] = 0;

        Product memory product = products[order.productId];
        product.seller.transfer(amount);
        emit ProductDelivered(orderId);
    }

    function getOrder(
        string memory orderId
    )
        external
        view
        returns (
            address buyer,
            address seller,
            string memory productId,
            uint256 price,
            ProductType productType,
            OrderStatus status,
            uint256 createdAt,
            uint256 shippedAt
        )
    {
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
