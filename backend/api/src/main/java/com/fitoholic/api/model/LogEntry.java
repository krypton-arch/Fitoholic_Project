// File: src/main/java/com/fitoholic/api/model/LogEntry.java
package com.fitoholic.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference; // NEW IMPORT
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "log_entries")
public class LogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- THIS IS THE UPDATED RELATIONSHIP ---
    // We remove the cascade property from the child side. The User (parent) now manages it.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // This prevents infinite loops when converting to JSON
    private User user;

    @Column(nullable = false)
    private LocalDate logDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LogType logType;

    @Column(nullable = false)
    private Double value;
}
