package com.fitoholic.api.service;

import com.fitoholic.api.dto.LoginResponse;
import com.fitoholic.api.model.PasswordResetToken;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.PasswordResetTokenRepository;
import com.fitoholic.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;

    public LoginResponse login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
        String jwtToken = jwtService.generateToken(user);
        return new LoginResponse(jwtToken, user.getRole());
    }

    public User signup(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) { throw new IllegalStateException("Email already in use."); }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public void createPasswordResetTokenForUser(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            PasswordResetToken token = tokenRepository.findByUser(user);
            String newRandomToken = UUID.randomUUID().toString();
            if (token == null) { token = new PasswordResetToken(newRandomToken, user); } 
            else { token.setToken(newRandomToken); token.setExpiryDate(new Date(System.currentTimeMillis() + (60 * 60 * 1000))); }
            tokenRepository.save(token);
            emailService.sendPasswordResetEmail(user.getEmail(), newRandomToken);
        });
    }

    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken == null) { return "invalidToken"; }
        if (passToken.getExpiryDate().before(Calendar.getInstance().getTime())) { tokenRepository.delete(passToken); return "expired"; }
        return null;
    }

    public void changeUserPassword(String token, String newPassword) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        User user = passToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(passToken);
    }
}
