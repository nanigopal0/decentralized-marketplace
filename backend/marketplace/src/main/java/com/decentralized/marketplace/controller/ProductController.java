package com.decentralized.marketplace.controller;

import com.decentralized.marketplace.dto.ProductDTO;
import com.decentralized.marketplace.entity.ProductType;
import com.decentralized.marketplace.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("add")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO product) {

        return ResponseEntity.accepted().body(productService.addProduct(product));

    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteProduct(@RequestParam("product-id") ObjectId productId) {

        productService.removeProduct(productId);
        return ResponseEntity.accepted().body("Product deleted successfully");

    }

    @GetMapping("get-all-products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());

    }

    @GetMapping("get")
    public ResponseEntity<ProductDTO> getProduct(@RequestParam(value = "productId") ObjectId productId) {
        return ResponseEntity.ok(productService.getProduct(productId));

    }


    @GetMapping("get-by-sellerId")
    public ResponseEntity<List<ProductDTO>> getAllProductsBySellerId(@RequestParam(value = "sellerId") ObjectId sellerId) {

        return ResponseEntity.ok(productService.getAllProductsBySellerId(sellerId));

    }

    @GetMapping("get-by-product-type")
    public ResponseEntity<List<ProductDTO>> getAllProductsByProductType(@RequestParam(value = "productType") ProductType productType) {

        return ResponseEntity.ok(productService.getAllProductsByProductType(productType));

    }

    @GetMapping("get-by-max-price")
    public ResponseEntity<List<ProductDTO>> getAllProductsByMaxPrice(@RequestParam(value = "maxPrice") Double maxPrice) {

        return ResponseEntity.ok(productService.getAllProductsByMaxPrice(maxPrice));

    }

    @GetMapping("get-by-min-price")
    public ResponseEntity<List<ProductDTO>> getAllProductsByMinPrice(@RequestParam(value = "minPrice") Double minPrice) {

        return ResponseEntity.ok(productService.getAllProductsByMinPrice(minPrice));

    }

    @GetMapping("get-by-price-range")
    public ResponseEntity<List<ProductDTO>> getAllProductsWithinRangeOfPrice(@RequestParam(value = "minPrice") Double minPrice, @RequestParam(value = "maxPrice") Double maxPrice) {

        return ResponseEntity.ok(productService.getAllProductsWithinRangePrice(minPrice, maxPrice));

    }

    @GetMapping("search")
    public ResponseEntity<List<ProductDTO>> searchProductByTitle(@RequestParam(value = "keyword") String title) {

        return ResponseEntity.ok(productService.searchProductsByTitle(title));

    }

}
