// File: src/main/java/com/fitoholic/api/service/AdminService.java
package com.fitoholic.api.service;

import com.fitoholic.api.model.LogEntry;
import com.fitoholic.api.model.PasswordResetToken;
import com.fitoholic.api.model.Role;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.LogEntryRepository;
import com.fitoholic.api.repository.PasswordResetTokenRepository;
import com.fitoholic.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final LogEntryRepository logEntryRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    // The GoalRepository dependency is now removed.

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // This method is no longer needed since we removed the Edit feature from the UI.
    // We are removing it to keep the code clean.
    // If you ever want to add it back, you would re-create a UserUpdateDto.
    /*
    @Transactional
    public User updateUser(Long id, UserUpdateDto updateDto) { ... }
    */

    @Transactional
    public void deleteUser(Long idToDelete, String currentAdminEmail) {
        User userToDelete = userRepository.findById(idToDelete).orElseThrow(() -> new RuntimeException("User not found"));
        User currentAdmin = userRepository.findByEmail(currentAdminEmail).orElseThrow(() -> new IllegalStateException("Admin not found"));
        
        if (currentAdmin.getId().equals(userToDelete.getId())) { throw new SecurityException("Admins cannot delete their own accounts."); }
        if (userToDelete.getRole() == Role.ADMIN) { throw new SecurityException("Admins cannot delete other admins."); }
        
        PasswordResetToken token = passwordResetTokenRepository.findByUser(userToDelete);
        if (token != null) { passwordResetTokenRepository.delete(token); }
        
        List<LogEntry> userLogs = logEntryRepository.findByUserOrderByLogDateDesc(userToDelete);
        if (!userLogs.isEmpty()) { logEntryRepository.deleteAll(userLogs); }
        
        // The logic to delete goals is now removed.
        
        userRepository.delete(userToDelete);
    }

    public List<LogEntry> getLogsForSpecificUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return logEntryRepository.findByUserOrderByLogDateDesc(user);
    }
}
