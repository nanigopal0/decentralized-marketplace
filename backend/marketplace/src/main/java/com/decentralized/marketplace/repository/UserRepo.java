package com.decentralized.marketplace.repository;

import com.decentralized.marketplace.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
}
