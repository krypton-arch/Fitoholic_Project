// File: src/main/java/com/fitoholic/api/controller/AuthController.java
package com.fitoholic.api.controller;

import com.fitoholic.api.dto.LoginRequest;
import com.fitoholic.api.dto.LoginResponse;
import com.fitoholic.api.dto.SignupRequest;
import com.fitoholic.api.model.User;
import com.fitoholic.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // These are record classes, a shorthand for DTOs.
    public record ForgotPasswordRequest(String email) {}
    public record ResetPasswordRequest(String token, String newPassword) {}

    // --- FULLY IMPLEMENTED SIGNUP ENDPOINT ---
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        User newUser = new User();
        newUser.setName(signupRequest.getName());
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPassword(signupRequest.getPassword());
        authService.signup(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    // --- FULLY IMPLEMENTED LOGIN ENDPOINT ---
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // We call the login method from our service and return its response directly.
        return ResponseEntity.ok(authService.login(loginRequest.getEmail(), loginRequest.getPassword()));
    }
    
    // --- FULLY IMPLEMENTED FORGOT PASSWORD ENDPOINT ---
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.createPasswordResetTokenForUser(request.email());
        // We always return a generic success message to prevent email enumeration.
        return ResponseEntity.ok(Map.of("message", "If an account with that email exists, a password reset link has been sent."));
    }

    // --- FULLY IMPLEMENTED RESET PASSWORD ENDPOINT ---
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String validationResult = authService.validatePasswordResetToken(request.token());
        
        if (validationResult != null) {
            String message = "Invalid or expired reset token.";
            return ResponseEntity.badRequest().body(Map.of("error", message));
        }
        
        // If the token was valid, we proceed to change the password.
        authService.changeUserPassword(request.token(), request.newPassword());
        return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));
    }
}
