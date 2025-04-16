package com.decentralized.marketplace.entity;


import com.mongodb.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private ObjectId id;
    private String fullName;
    @Indexed(unique = true)
    @NonNull
    private String email;
    private String password;
    private String avatar;
    private LocalDateTime createdAt;
    private Role role;
    private String ethereumPublicKey;
}
