package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.entity.Buyer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BuyerRepo extends MongoRepository<Buyer, ObjectId> {

//    Optional<Buyer> findByEmail(String email);
}
