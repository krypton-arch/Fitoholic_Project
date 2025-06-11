// File: src/main/java/com/fitoholic/api/dto/LogEntryDto.java
package com.fitoholic.api.dto;

import com.fitoholic.api.model.LogType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class LogEntryDto {
    private LocalDate logDate;
    private LogType logType;
    private Double value;
}
