// File: src/main/java/com/fitoholic/api/dto/UserUpdateDto.java
package com.fitoholic.api.dto;

import com.fitoholic.api.model.Role;
import lombok.Data;

/**
 * This Data Transfer Object is used when an admin updates a user's details.
 * It contains only the fields that an admin is permitted to change.
 */
@Data
public class UserUpdateDto {
    private String name;
    private Role role;
    private boolean hasPremiumAccess;
}
