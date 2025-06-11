// File: src/main/java/com/fitoholic/api/controller/LogController.java
package com.fitoholic.api.controller;

import com.fitoholic.api.dto.LogEntryDto;
import com.fitoholic.api.model.LogEntry;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.UserRepository;
import com.fitoholic.api.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/logs")
@RequiredArgsConstructor
public class LogController {
    private final LogService logService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<LogEntry>> getAllLogs() {
        return ResponseEntity.ok(logService.getLogsForUser(getCurrentUser()));
    }

    @PostMapping
    public ResponseEntity<LogEntry> addLog(@RequestBody LogEntryDto logEntryDto) {
        User currentUser = getCurrentUser();
        LogEntry newLog = new LogEntry();
        newLog.setUser(currentUser);
        newLog.setLogDate(logEntryDto.getLogDate());
        newLog.setLogType(logEntryDto.getLogType());
        newLog.setValue(logEntryDto.getValue());
        LogEntry savedLog = logService.addOrUpdateLog(newLog);
        return ResponseEntity.ok(savedLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        try {
            logService.deleteLog(id, getCurrentUser());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
}
