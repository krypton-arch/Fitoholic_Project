// File: src/main/java/com/fitoholic/api/repository/PasswordResetTokenRepository.java
package com.fitoholic.api.repository;

import com.fitoholic.api.model.PasswordResetToken;
import com.fitoholic.api.model.User; // Import User
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    
    PasswordResetToken findByToken(String token);
    
    // --- NEW METHOD ---
    // Find a token that is associated with a specific user object.
    PasswordResetToken findByUser(User user);
}
