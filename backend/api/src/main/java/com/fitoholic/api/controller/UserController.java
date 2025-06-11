// File: src/main/java/com/fitoholic/api/controller/UserController.java
package com.fitoholic.api.controller;

import com.fitoholic.api.dto.PasswordChangeDto;
import com.fitoholic.api.dto.ProfileUpdateDto;
import com.fitoholic.api.dto.UserProfileResponse;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.UserRepository;
import com.fitoholic.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // --- UPDATED GET /profile ---
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile() {
        User user = userRepository.findByEmail(getCurrentUserEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        // Now populates the DTO with all 6 fields, including bio.
        return ResponseEntity.ok(new UserProfileResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.isHasPremiumAccess(),
            user.getRole(),
            user.getBio() // <-- ADDED BIO
        ));
    }

    // --- UPDATED PUT /profile ---
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileUpdateDto profileUpdateDto) {
        try {
            User updatedUser = userService.updateProfile(getCurrentUserEmail(), profileUpdateDto);
            // Also returns the DTO with all 6 fields.
            return ResponseEntity.ok(new UserProfileResponse(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.isHasPremiumAccess(),
                updatedUser.getRole(),
                updatedUser.getBio() // <-- ADDED BIO
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // This endpoint is unchanged and correct.
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeDto passwordChangeDto) {
        try {
            userService.changePassword(getCurrentUserEmail(), passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
            return ResponseEntity.ok().body("Password changed successfully.");
        } catch (SecurityException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
