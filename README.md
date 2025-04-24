# 🛒 Decentralized SmartMarketplace (D-SMP)

A full-stack **Decentralized Marketplace Web Application** built with React, Tailwind CSS,Spring Boot, MongoDB, Solidity, and Ethereum smart contracts. It empowers buyers and sellers to interact in a trustless environment, with on-chain escrow mechanisms and transparent order handling.

---

## 🚀 Features

- ✅ **User Authentication**
- 🧾 **List & Browse Products**
- 🔐 **On-Chain Escrow for Payments**
- 📦 **Order Management System (Shipped, Delivered, Cancelled)**
- 🔐 **OTP-Based Delivery Confirmation**
- 🕓 **Auto Refunds or Fund Releases Based on Timeout**
- 🌓 **Dark Mode Support**
- 📱 **Responsive UI for All Devices**

---

## 🛠 Tech Stack

| Frontend     | Backend     | Blockchain           |
| ------------ | ----------- | -------------------- |
| React.js     | Spring Boot | Solidity             |
| Tailwind CSS | MongoDB     | (Smart Contracts)    |
| Redux        | REST APIs   | Ethers.js + MetaMask |

---

## 📦 Installation

```bash
git clone https://github.com/nanigopal0/decentralized-marketplace.git
cd decentralized-marketplace
npm install
```

To run locally:

```bash
npm run dev
```

Make sure your **MetaMask** wallet is connected and set to the correct **Ethereum test network** (Sepolia).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

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

- ⛓ Fully implemented `Escrow`, `Order Confirmation` functionality.

---

## 📁 Folder Structure

```
/frontend            --> React Frontend
/contracts         --> Solidity Smart Contracts
/backend   --> Spring-Boot Backend API MongoDB (e.g., for OTPs or timeout logic)
```

---

## 📸 Screenshots

> Add screenshots of:
>
> - Product listing
> - Buyer dashboard
> - Order tracking
> - MetaMask integration

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

Soon to be hosted on: **Vercel / Ethereum testnet Sepoila**

---

## 📬 Contact

Created with ❤️ by [Nanigopal Rana, Debkanta Dutta]

🐙 GitHub: https://github.com/Debkanta-Dutta
🐙 GitHub: https://github.com/nanigopal0
