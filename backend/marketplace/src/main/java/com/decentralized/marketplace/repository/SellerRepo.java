package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.entity.Seller;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SellerRepo extends MongoRepository<Seller, ObjectId> {

//    Optional<Seller> findByEmail(String email);
}
