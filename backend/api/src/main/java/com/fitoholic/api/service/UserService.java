// File: src/main/java/com/fitoholic/api/service/UserService.java
package com.fitoholic.api.service;

import com.fitoholic.api.dto.ProfileUpdateDto;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User updateProfile(String currentEmail, ProfileUpdateDto profileUpdateDto) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!currentEmail.equals(profileUpdateDto.getEmail()) && userRepository.findByEmail(profileUpdateDto.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already in use by another account.");
        }

        user.setName(profileUpdateDto.getName());
        user.setEmail(profileUpdateDto.getEmail());
        user.setBio(profileUpdateDto.getBio());
        
        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(String currentEmail, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new SecurityException("Incorrect current password.");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
