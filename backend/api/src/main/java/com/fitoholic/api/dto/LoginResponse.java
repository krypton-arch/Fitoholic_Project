// File: src/main/java/com/fitoholic/api/dto/LoginResponse.java
package com.fitoholic.api.dto;

import com.fitoholic.api.model.Role; // Import the Role enum
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private Role role; // Add the role field

    // The constructor now correctly accepts both a token and a role.
    public LoginResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }
}
