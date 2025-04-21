package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.contract.service.ContractService;
import com.decentralized.marketplace.dto.ProductDTO;
import com.decentralized.marketplace.entity.Product;
import com.decentralized.marketplace.entity.ProductType;
import com.decentralized.marketplace.exception.ProductNotFoundException;
import com.decentralized.marketplace.exception.UnauthorizedUserException;
import com.decentralized.marketplace.repository.ProductRepo;
import com.decentralized.marketplace.service.ProductService;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final ContractService contractService;

    public ProductServiceImpl(ProductRepo productRepo, ContractService contractService) {
        this.productRepo = productRepo;
        this.contractService = contractService;
    }


    @Override
    public ProductDTO addProduct(ProductDTO productDTO) {
        productDTO.setCreatedAt(LocalDateTime.now());
        Product product = Product.builder()
                .price(productDTO.getPrice())
                .description(productDTO.getDescription())
                .stock(productDTO.getStock())
                .type(productDTO.getType())
                .priceUnit("ETH")
                .title(productDTO.getTitle())
                .createdAt(LocalDateTime.now())
                .mediaUrl(productDTO.getMediaUrl())
                .sellerId(new ObjectId(productDTO.getSellerId()))
                .build();
        Product saved = productRepo.save(product);
        //add product to blockchain
//        contractService.addProductToBlockchain(product.getId().toHexString(),product.getPrice().intValue(),product.getType());


        return convertProductToProductDTO(saved);
    }

    private ProductDTO convertProductToProductDTO(Product product) {
        return ProductDTO.builder()
                .productId(product.getId().toHexString())
                .price(product.getPrice())
                .description(product.getDescription())
                .stock(product.getStock())
                .type(product.getType())
                .priceUnit(product.getPriceUnit())
                .title(product.getTitle())
                .createdAt(product.getCreatedAt())
                .mediaUrl(product.getMediaUrl())
                .sellerId(product.getSellerId().toHexString())
                .build();
    }

    @Override
    public void removeProduct(ObjectId productId) {
        Product product =productRepo.findById(productId).orElseThrow(ProductNotFoundException::new);
        if(!Objects.equals(product.getSellerId(), new ObjectId(UserServiceImpl.getCustomUserDetailsFromAuthentication().getUserId())))
            throw new UnauthorizedUserException("You do not have permission to delete this product");
        productRepo.deleteById(productId);
    }

    @Override
    public ProductDTO getProduct(ObjectId productId) {
        Product product =  productRepo.findById(productId).orElseThrow(()-> new ProductNotFoundException(productId.toHexString()));
        return convertProductToProductDTO(product);
    }

    @Override
    public List<ProductDTO> getAllProductsBySellerId(ObjectId sellerId) {
        return productRepo.findProductsBySellerId(sellerId).stream().map(this::convertProductToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> searchProductsByTitle(String keyword) {
        return productRepo.searchProductByTitleContaining(keyword).stream().map(this::convertProductToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepo.findAll().stream().map(this::convertProductToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> getAllProductsByProductType(ProductType type) {
        return productRepo.findProductsByType(type).stream().map(this::convertProductToProductDTO).toList();
    }

    // Get all the products where price is less than or equal to the given price
    @Override
    public List<ProductDTO> getAllProductsByMaxPrice(Double upperPrice) {
        return productRepo.findProductsByPriceLessThanEqual(upperPrice).stream().map(this::convertProductToProductDTO).toList();
    }

    // Get all the products where price is greater than or equal to the given price
    @Override
    public List<ProductDTO> getAllProductsByMinPrice(Double lowerPrice) {
        return productRepo.findProductsByPriceGreaterThanEqual(lowerPrice).stream().map(this::convertProductToProductDTO).toList();
    }

    // Get all the products where price is within the range of given price
    @Override
    public List<ProductDTO> getAllProductsWithinRangePrice(Double lowerPrice, Double upperPrice) {
        return productRepo.findProductsByPriceBetween(lowerPrice, upperPrice).stream().map(this::convertProductToProductDTO).toList();
    }
}
