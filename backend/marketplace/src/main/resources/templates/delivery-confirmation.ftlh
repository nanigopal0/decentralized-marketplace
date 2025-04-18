<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Delivery Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #3f51b5;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
        }
        .order-details {
            margin-top: 20px;
            border-collapse: collapse;
            width: 100%;
        }
        .order-details th, .order-details td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .order-details th {
            background-color: #f2f2f2;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        .success-message {
            background-color: #e8f5e9;
            border-left: 5px solid #4caf50;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Order Delivery Confirmation</h1>
    </div>
    <div class="content">
        <p>Dear Customer,</p>
        <div class="success-message">
            <p><strong>Your order has been marked as delivered!</strong></p>
        </div>

        <p>Here are your order details:</p>

        <table class="order-details">
            <tr>
                <th>Order ID</th>
                <td>${order.orderId}</td>
            </tr>
            <tr>
                <th>Product ID</th>
                <td>${order.productId}</td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td>${order.quantity}</td>
            </tr>
            <tr>
                <th>Total Price</th>
                <td>${order.totalPrice?string["0.##"]} ${order.priceUnit}</td>
            </tr>
            <tr>
                <th>Order Status</th>
                <td>${order.status}</td>
            </tr>
            <tr>
                <th>Order Date</th>
                <td>${order.orderedAt}</td>
            </tr>
        </table>

        <p>Thank you for shopping with us!</p>
    </div>
    <div class="footer">
        <p>This is an automated email. Please do not reply to this message.</p>
        <p>&copy; 2025 Decentralized Marketplace. All rights reserved.</p>
    </div>
</body>
</html>