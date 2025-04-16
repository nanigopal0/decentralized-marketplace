package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.entity.Product;
import com.decentralized.marketplace.entity.ProductType;
import com.decentralized.marketplace.exception.ProductNotFoundException;
import com.decentralized.marketplace.repository.ProductRepo;
import com.decentralized.marketplace.service.ProductService;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    public ProductServiceImpl(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public Product addProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        return productRepo.save(product);
    }

    @Override
    public void removeProduct(ObjectId productId) {
        productRepo.deleteById(productId);
    }

    @Override
    public Product getProduct(ObjectId productId) {
        return productRepo.findById(productId).orElseThrow(()-> new ProductNotFoundException(productId.toHexString()));
    }

    @Override
    public List<Product> getAllProductsBySellerId(ObjectId sellerId) {
        return productRepo.findProductsBySellerId(sellerId);
    }

    @Override
    public List<Product> searchProductsByTitle(String keyword) {
        return productRepo.searchProductByTitleContaining(keyword);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public List<Product> getAllProductsByProductType(ProductType type) {
        return productRepo.findProductsByType(type);
    }

    // Get all the products where price is less than or equal to the given price
    @Override
    public List<Product> getAllProductsByMaxPrice(Double upperPrice) {
        return productRepo.findProductsByPriceLessThanEqual(upperPrice);
    }

    // Get all the products where price is greater than or equal to the given price
    @Override
    public List<Product> getAllProductsByMinPrice(Double lowerPrice) {
        return productRepo.findProductsByPriceGreaterThanEqual(lowerPrice);
    }

    // Get all the products where price is within the range of given price
    @Override
    public List<Product> getAllProductsWithinRangePrice(Double lowerPrice, Double upperPrice) {
        return productRepo.findProductsByPriceBetween(lowerPrice, upperPrice);
    }
}
