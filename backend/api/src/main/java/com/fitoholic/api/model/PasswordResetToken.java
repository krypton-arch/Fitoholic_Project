// File: src/main/java/com/fitoholic/api/model/PasswordResetToken.java
package com.fitoholic.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference; // NEW IMPORT
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class PasswordResetToken {
    private static final int EXPIRATION_MINUTES = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    // --- THIS IS THE UPDATED RELATIONSHIP ---
    // We remove cascade from here. The User (parent) manages it.
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    @JsonBackReference
    private User user;

    private Date expiryDate;

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expiryDate = new Date(System.currentTimeMillis() + (60 * 60 * 1000));
    }
}
