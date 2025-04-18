const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SmartMarketplace", function () {
  let marketplace, owner, seller, buyer, other;
  const productPrice = ethers.utils.parseEther("1");

  beforeEach(async () => {
    [owner, seller, buyer, other] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("SmartMarketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();
  });

  it("Should allow seller to list a product", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0); // Physical
    const product = await marketplace.products(1);
    expect(product.seller).to.equal(seller.address);
    expect(product.price).to.equal(productPrice);
  });

  it("Should allow buyer to purchase and lock ETH in escrow", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0);

    await expect(
      marketplace.connect(buyer).purchaseProduct(1, { value: productPrice })
    ).to.emit(marketplace, "ProductPurchased");

    const order = await marketplace.orders(1);
    expect(order.buyer).to.equal(buyer.address);
    expect(await marketplace.escrow(1)).to.equal(productPrice);
  });

  it("Should allow seller to confirm shipment (OTP Verified Step)", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0);
    await marketplace
      .connect(buyer)
      .purchaseProduct(1, { value: productPrice });

    await expect(marketplace.connect(seller).confirmShipment(1)).to.emit(
      marketplace,
      "ProductShipped"
    );

    const order = await marketplace.orders(1);
    expect(order.status).to.equal(2); // Shipped
  });

  it("Should allow buyer to confirm delivery and release funds", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0);
    await marketplace
      .connect(buyer)
      .purchaseProduct(1, { value: productPrice });
    await marketplace.connect(seller).confirmShipment(1);

    await expect(marketplace.connect(buyer).confirmDelivery(1)).to.emit(
      marketplace,
      "ProductDelivered"
    );

    expect(await marketplace.escrow(1)).to.equal(0);
  });

  it("Should refund buyer if seller doesn't ship in time", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0);
    await marketplace
      .connect(buyer)
      .purchaseProduct(1, { value: productPrice });

    // Simulate time passing
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine");

    await expect(marketplace.refundIfNotShipped(1)).to.emit(
      marketplace,
      "Refunded"
    );
    expect(await marketplace.escrow(1)).to.equal(0);

    const order = await marketplace.orders(1);
    expect(order.status).to.equal(4); // Refunded
  });

  it("Should release funds to seller if buyer doesn’t confirm delivery in time", async () => {
    await marketplace.connect(seller).listProduct(productPrice, 0);
    await marketplace
      .connect(buyer)
      .purchaseProduct(1, { value: productPrice });
    await marketplace.connect(seller).confirmShipment(1);

    // Simulate time passing
    await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine");

    await expect(marketplace.releaseIfNotConfirmed(1)).to.emit(
      marketplace,
      "ProductDelivered"
    );
    expect(await marketplace.escrow(1)).to.equal(0);

    const order = await marketplace.orders(1);
    expect(order.status).to.equal(3); // Delivered
  });
});
