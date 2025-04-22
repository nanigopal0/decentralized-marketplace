package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.entity.Product;
import com.decentralized.marketplace.entity.ProductType;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepo extends MongoRepository<Product, ObjectId> {

    List<Product> findProductsBySellerId(ObjectId sellerId);

    List<Product> findProductsByType(ProductType type);

    List<Product> searchProductByTitleContaining(String title);

    List<Product> findProductsByPriceGreaterThanEqual(Double priceIsGreaterThan);

    List<Product> findProductsByPriceLessThanEqual(Double priceIsLessThan);

    List<Product> findProductsByPriceBetween(Double lowerPrice, Double upperPrice);

    Integer countProductBySellerId(ObjectId sellerId);
}
