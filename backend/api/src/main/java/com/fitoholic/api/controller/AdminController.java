// File: src/main/java/com/fitoholic/api/controller/AdminController.java
package com.fitoholic.api.controller;

// We no longer import Goal or UserUpdateDto
import com.fitoholic.api.model.LogEntry;
import com.fitoholic.api.model.User;
import com.fitoholic.api.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/hello") public ResponseEntity<String> sayHelloToAdmin() { return ResponseEntity.ok("Hello, Admin!"); }
    @GetMapping("/users") public ResponseEntity<List<User>> getAllUsers() { return ResponseEntity.ok(adminService.getAllUsers()); }
    @GetMapping("/users/{id}") public ResponseEntity<User> getUserById(@PathVariable Long id) { return adminService.getUserById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    
    // The @PutMapping for updateUser is removed.

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, Authentication authentication) {
        try {
            adminService.deleteUser(id, authentication.getName());
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/users/{userId}/logs") public ResponseEntity<List<LogEntry>> getLogsForUser(@PathVariable Long userId) { try { return ResponseEntity.ok(adminService.getLogsForSpecificUser(userId)); } catch (RuntimeException e) { return ResponseEntity.notFound().build(); } }
    
    // The endpoint to delete a specific log is no longer needed in the admin scope.
    // An admin would view the user's logs and then the user would delete their own.
    // We are removing this endpoint to simplify.
    // @DeleteMapping("/logs/{logId}") ...
}
