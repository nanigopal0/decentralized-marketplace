<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
        }
        .otp-container {
            background-color: #e3f2fd;
            border-left: 5px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #1565C0;
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
        .expiry-note {
            color: #d32f2f;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
    </div>
    <div class="content">
        <p>Dear ${recipientType},</p>
        
        <p>${message}</p>
        
        <div class="otp-container">
            <p>Your verification code is:</p>
            <p class="otp-code">${otp}</p>
            <p class="expiry-note">This code will expire in ${expiryMinutes} minutes.</p>
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

        <p>${additionalInstructions}</p>
    </div>
    <div class="footer">
        <p>This is an automated email. Please do not reply to this message.</p>
        <p>&copy; 2025 Decentralized Marketplace. All rights reserved.</p>
    </div>
</body>
</html>