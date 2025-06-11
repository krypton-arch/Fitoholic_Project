package com.fitoholic.api.service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}") private String fromEmail;

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail); // Set from address from properties
        message.setTo(to);
        message.setSubject("Fitoholic - Password Reset Request");
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;
        String emailBody = "You have requested to reset your password.\n\n"
                         + "Click the link below to set a new password:\n"
                         + resetUrl + "\n\n"
                         + "If you did not request this, please ignore this email.";
        message.setText(emailBody);
        mailSender.send(message);
    }
}
