package com.fitoholic.api.dto;
import lombok.Data;
@Data
public class PasswordChangeDto {
    private String currentPassword;
    private String newPassword;
}
