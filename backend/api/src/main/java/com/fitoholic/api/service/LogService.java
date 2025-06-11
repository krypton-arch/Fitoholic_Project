// File: src/main/java/com/fitoholic/api/service/LogService.java
package com.fitoholic.api.service;

import com.fitoholic.api.model.LogEntry;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.LogEntryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogEntryRepository logEntryRepository;

    public List<LogEntry> getLogsForUser(User user) {
        return logEntryRepository.findByUserOrderByLogDateDesc(user);
    }

    @Transactional
    public LogEntry addOrUpdateLog(LogEntry logEntry) {
        // This logic now applies to ALL log types.
        Optional<LogEntry> existingLogOpt = logEntryRepository.findByUserAndLogDateAndLogType(
            logEntry.getUser(),
            logEntry.getLogDate(),
            logEntry.getLogType()
        );

        if (existingLogOpt.isPresent()) {
            // If it exists, UPDATE its value.
            LogEntry existingLog = existingLogOpt.get();
            existingLog.setValue(logEntry.getValue());
            return logEntryRepository.save(existingLog);
        } else {
            // If it does not exist, INSERT the new entry.
            return logEntryRepository.save(logEntry);
        }
    }

    public void deleteLog(Long logId, User user) {
        LogEntry logEntry = logEntryRepository.findById(logId)
                .orElseThrow(() -> new IllegalStateException("Log not found"));
        if (!logEntry.getUser().getId().equals(user.getId())) {
            throw new SecurityException("User not authorized");
        }
        logEntryRepository.delete(logEntry);
    }
}
