# 🛒 Decentralized SmartMarketplace 

A full-stack **Decentralized Marketplace Web Application** built with **React**, **Tailwind CSS**, **Spring Boot**, **MongoDB**, **Solidity**, and **Ethereum Smart Contracts**. It empowers buyers and sellers to interact in a trustless environment with on-chain escrow mechanisms and transparent order handling.

---

## 🚀 Features

- ✅ **User Role-Based Authentication** (Buyer / Seller) with Spring Security.
- 🧾 **List & Browse Products** with ease.
- 🔐 **On-Chain Escrow for Payments** (ETH).
- 📦 **Order Management System**: Pending, Accepted, Shipped, Delivered, Cancelled.
- 🔐 **OTP-Based Shipment and Delivery Confirmation**.
- 📱 **Responsive UI** for all devices.

---

## 🛠 Tech Stack

| **Frontend**      | **Backend**     | **Blockchain**         |
| ----------------- | --------------- | ---------------------- |
| React.js          | Spring Boot     | Solidity               |
| Tailwind CSS      | MongoDB         | (Smart Contracts)      |
| Redux             | REST APIs       | Ethers.js + MetaMask   |

---

## 📦 Installation

### Clone the Repository
```bash
git clone https://github.com/nanigopal0/decentralized-marketplace.git
cd decentralized-marketplace
cd frontend
npm install
```

### Run Locally
```bash
npm run dev
```
`

> **Note:** Ensure your **MetaMask** wallet is connected and set to the correct **Ethereum test network** (Sepolia).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_BACKEND_URL=http://localhost:8080
```

---

## 🧠 Smart Contract Overview

```solidity
function getOrder(string memory orderId) external view returns (
  address buyer,
  address seller,
  string memory productId,
  uint256 price,
  ProductType productType,
  OrderStatus status,
  uint256 createdAt,
  uint256 shippedAt
)
```

- ⛓ Fully implemented **Escrow** and **Order Confirmation** functionality.

---

## 📁 Folder Structure

```
/frontend            --> React Frontend
/contracts           --> Solidity Smart Contracts
/backend             --> Spring-Boot Backend API with MongoDB
```

---

## 📸 Screenshots

> Add screenshots of:
>
> - Product Listing
> - Buyer Dashboard
> - Order Tracking
> - MetaMask Integration

---

## 🔐 Security & Policies

- **Security Page**: `/security`
- **Privacy Policy**: `/privacy`
- **Terms of Use**: `/terms`

Each page outlines the commitment to decentralized security, data privacy, and user protection.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 🌐 Live Demo

Check out the live demo here: [Decentralized Marketplace](https://decentralized-marketplace-beta.vercel.app)

---

## 📬 Contact

Created with ❤️ by **Nanigopal Rana** and **Debkanta Dutta**.

- 🐙 GitHub: [Debkanta Dutta](https://github.com/Debkanta-Dutta)
- 🐙 GitHub: [Nanigopal Rana](https://github.com/nanigopal0)