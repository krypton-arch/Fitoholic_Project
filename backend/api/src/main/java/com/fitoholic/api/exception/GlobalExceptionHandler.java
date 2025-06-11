// File: src/main/java/com/fitoholic/api/exception/GlobalExceptionHandler.java
package com.fitoholic.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// @RestControllerAdvice tells Spring that this class is a global exception handler
// for all @RestController classes.
@RestControllerAdvice
public class GlobalExceptionHandler {

    // @ExceptionHandler annotation marks this method as a handler for a specific exception type.
    // We are telling it to run whenever an AuthenticationException is thrown anywhere in the app.
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex) {
        // We return a clear, user-friendly message with the correct HTTP status code.
        return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED); // 401
    }

    // We can also handle the exception from our signup service here for consistency.
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalStateException(IllegalStateException ex) {
        // This will catch the "Email already in use" error.
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // 400
    }

    // A fallback handler for any other unexpected exceptions.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        // Log the exception for debugging purposes.
        ex.printStackTrace();
        return new ResponseEntity<>("An unexpected error occurred. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }
}
