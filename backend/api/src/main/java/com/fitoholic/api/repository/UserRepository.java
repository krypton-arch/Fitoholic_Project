// File: src/main/java/com/fitoholic/api/repository/UserRepository.java
package com.fitoholic.api.repository;

import com.fitoholic.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.fitoholic.api.model.Role; // Add import

import java.util.Optional;

// @Repository tells Spring that this is a Repository bean and it should be managed by the Spring container.
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // --- Custom Query Methods ---

    // Spring Data JPA is very smart. By simply declaring a method with a specific name,
    // it will automatically generate the SQL query for us.

    // This method will translate to: "SELECT * FROM users WHERE email = ?"
    Optional<User> findByEmail(String email);

    // NEW METHOD: Counts how many users have a specific role.

    long countByRole(Role role);

}
