package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.dto.BuyerOrderDTO;
import com.decentralized.marketplace.dto.SellerOrderDTO;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

public class CustomOrderRepoImpl implements CustomOrderRepo {

    private final MongoTemplate mongoTemplate;

    public CustomOrderRepoImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<BuyerOrderDTO> findAllBuyerOrderWithProductByBuyerId(ObjectId buyerId, Sort sort) {

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("buyerId").is(buyerId)),
                orderToProductLookup(),
                orderToUserLookup("sellerId", "seller"),
                unwind("product_info"),
                unwind("seller"),
                orderToProductAndUserProjection("seller"),
                Aggregation.sort(sort)
        );

        return mongoTemplate.aggregate(aggregation, "orders", BuyerOrderDTO.class).getMappedResults();
    }

    @Override
    public List<SellerOrderDTO> findAllSellerPendingOrderWithProductBySellerId(ObjectId sellerId, Sort sort) {

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("sellerId").is(sellerId)),
                orderToProductLookup(),
                orderToUserLookup("buyerId", "buyer"),
                unwind("product_info"),
                unwind("buyer"),
                orderToProductAndUserProjection("buyer"),
                Aggregation.sort(sort)
        );
        return mongoTemplate.aggregate(aggregation, "orders", SellerOrderDTO.class).getMappedResults();
    }

    private LookupOperation orderToProductLookup() {
        return Aggregation.lookup("products", "productId", "_id", "product_info");
    }

    private LookupOperation orderToUserLookup(String localField, String alias) {
        return Aggregation.lookup("users", localField, "_id", alias);
    }

    private UnwindOperation unwind(String field) {
        return Aggregation.unwind(field, true); // `true` enables `preserveNullAndEmptyArrays`
    }

    private ProjectionOperation orderToProductAndUserProjection(String userInfo) {
        return Aggregation.project("quantity", "pricePerItem", "totalPrice", "transactionHash", "orderedAt", "productId")
                .and("status").as("orderStatus")
                .and("_id").as("orderId")
                .and("product_info.title").as("productTitle")
                .and("product_info.mediaUrl").as("productMediaUrl")
                .and("product_info.type").as("productType")
                .and(userInfo + "._id").as(userInfo + ".userId")
                .and(userInfo + ".avatar").as(userInfo + ".avatar")
                .and(userInfo + ".fullName").as(userInfo + ".fullName")
                .and(userInfo + ".role").as(userInfo + ".role")
                .and(userInfo + ".email").as(userInfo + ".email")
                ;
    }

}
