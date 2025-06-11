// File: src/main/java/com/fitoholic/api/dto/SignupRequest.java
package com.fitoholic.api.dto;

import lombok.Data;

// The @Data annotation from Lombok will create getters and setters for us.
@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
}
