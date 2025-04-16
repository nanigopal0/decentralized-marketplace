package com.decentralized.marketplace.controller;

import com.decentralized.marketplace.entity.Product;
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
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        try{
            return ResponseEntity.accepted().body(productService.addProduct(product));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteProduct(@RequestParam("product-id") ObjectId productId) {
        try{
            productService.removeProduct(productId);
            return ResponseEntity.accepted().body("Product deleted successfully");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-all-products")
    public ResponseEntity<List<Product>> getAllProducts() {
        try{
            return ResponseEntity.ok(productService.getAllProducts());
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get")
    public ResponseEntity<Product> getProduct(@RequestParam(value = "productId") ObjectId productId) {
        try{
            return ResponseEntity.ok(productService.getProduct(productId));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("get-by-sellerId")
    public ResponseEntity<List<Product>> getAllProductsBySellerId(@RequestParam(value = "sellerId") ObjectId sellerId) {
        try{
            return ResponseEntity.ok(productService.getAllProductsBySellerId(sellerId));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-by-product-type")
    public ResponseEntity<List<Product>> getAllProductsByProductType(@RequestParam(value = "productType") ProductType productType) {
        try{
            return ResponseEntity.ok(productService.getAllProductsByProductType(productType));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-by-max-price")
    public ResponseEntity<List<Product>> getAllProductsByMaxPrice(@RequestParam(value = "maxPrice") Double maxPrice) {
        try{
            return ResponseEntity.ok(productService.getAllProductsByMaxPrice(maxPrice));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-by-min-price")
    public ResponseEntity<List<Product>> getAllProductsByMinPrice(@RequestParam(value = "minPrice") Double minPrice) {
        try{
            return ResponseEntity.ok(productService.getAllProductsByMinPrice(minPrice));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-by-price-range")
    public ResponseEntity<List<Product>> getAllProductsWithinRangeOfPrice(@RequestParam(value="minPrice") Double minPrice, @RequestParam(value="maxPrice") Double maxPrice) {
        try{
            return ResponseEntity.ok(productService.getAllProductsWithinRangePrice(minPrice, maxPrice));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("search")
    public ResponseEntity<List<Product>> searchProductByTitle(@RequestParam(value = "keyword") String title) {
        try{
            return ResponseEntity.ok(productService.searchProductsByTitle(title));
        }catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

}
