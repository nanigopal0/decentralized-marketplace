package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.ProductDTO;
import com.decentralized.marketplace.entity.Product;
import com.decentralized.marketplace.entity.ProductType;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {

    ProductDTO addProduct(ProductDTO product);

    void removeProduct(ObjectId productId);

    ProductDTO getProduct(ObjectId productId);

    List<ProductDTO> getAllProductsBySellerId(ObjectId sellerId);

    List<ProductDTO> searchProductsByTitle(String keyword);

    List<ProductDTO> getAllProducts();

    List<ProductDTO> getAllProductsByProductType(ProductType type);

    List<ProductDTO> getAllProductsByMaxPrice(Double upperPrice);

    List<ProductDTO> getAllProductsByMinPrice(Double lowerPrice);

    List<ProductDTO> getAllProductsWithinRangePrice(Double lowerPrice, Double upperPrice);
}
