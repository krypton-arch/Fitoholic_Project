// File: src/main/java/com/fitoholic/api/repository/LogEntryRepository.java
package com.fitoholic.api.repository;

import com.fitoholic.api.model.LogEntry;
import com.fitoholic.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {

    // Custom query to find all logs for a specific user, sorted by date descending.
    List<LogEntry> findByUserOrderByLogDateDesc(User user);

    // Custom query to find a specific type of log for a user on a specific date.
    // This will be useful for preventing duplicate entries (e.g., only one weight entry per day).
    Optional<LogEntry> findByUserAndLogDateAndLogType(User user, LocalDate logDate, com.fitoholic.api.model.LogType logType);
}
