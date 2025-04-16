package com.decentralized.marketplace.entity;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "buyers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Buyer {
    @Id
    private ObjectId id;
    @Indexed(unique = true)
    private ObjectId userId;
}
