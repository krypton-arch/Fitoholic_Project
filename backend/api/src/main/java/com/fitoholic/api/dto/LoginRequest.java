// File: src/main/java/com/fitoholic/api/dto/LoginRequest.java
package com.fitoholic.api.dto;

import lombok.Data;

// @Data from Lombok creates the getters and setters.
@Data
public class LoginRequest {
    private String email;
    private String password;
}
