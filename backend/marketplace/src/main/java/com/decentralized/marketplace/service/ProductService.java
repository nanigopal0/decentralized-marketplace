package com.decentralized.marketplace.service;

import com.decentralized.marketplace.entity.Product;
import com.decentralized.marketplace.entity.ProductType;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {

    Product addProduct(Product product);

    void removeProduct(ObjectId productId);

    Product getProduct(ObjectId productId);

    List<Product> getAllProductsBySellerId(ObjectId sellerId);

    List<Product> searchProductsByTitle(String keyword);

    List<Product> getAllProducts();

    List<Product> getAllProductsByProductType(ProductType type);

    List<Product> getAllProductsByMaxPrice(Double upperPrice);

    List<Product> getAllProductsByMinPrice(Double lowerPrice);

    List<Product> getAllProductsWithinRangePrice(Double lowerPrice, Double upperPrice);
}
