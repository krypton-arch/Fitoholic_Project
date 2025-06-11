// File: src/main/java/com/fitoholic/api/dto/UserProfileResponse.java
package com.fitoholic.api.dto;

import com.fitoholic.api.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private boolean hasPremiumAccess;
    private Role role;
    private String bio; // <-- THE NEW, CRITICAL FIELD
}
