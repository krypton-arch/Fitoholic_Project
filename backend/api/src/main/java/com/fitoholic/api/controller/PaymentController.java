// File: src/main/java/com/fitoholic/api/controller/PaymentController.java
package com.fitoholic.api.controller;

import com.fitoholic.api.dto.PaymentVerificationRequest;
import com.fitoholic.api.dto.UserProfileResponse;
import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.UserRepository;
import com.razorpay.*;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    @Value("${razorpay.key.id}") private String keyId;
    @Value("${razorpay.key.secret}") private String keySecret;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder() throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", 10000);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_fitoholic_premium");
        Order order = razorpayClient.orders.create(orderRequest);
        return ResponseEntity.ok(order.toString());
    }

    // --- THIS IS THE CORRECTED VERIFICATION ENDPOINT ---
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", request.getRazorpay_order_id());
            options.put("razorpay_payment_id", request.getRazorpay_payment_id());
            options.put("razorpay_signature", request.getRazorpay_signature());
            boolean isValid = Utils.verifyPaymentSignature(options, keySecret);

            if (isValid) {
                User currentUser = getCurrentUser();
                currentUser.setHasPremiumAccess(true);
                User updatedUser = userRepository.save(currentUser);

                // We now correctly provide all 6 arguments to the constructor.
                UserProfileResponse responseDto = new UserProfileResponse(
                    updatedUser.getId(),
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.isHasPremiumAccess(),
                    updatedUser.getRole(),
                    updatedUser.getBio() // <-- THE MISSING ARGUMENT
                );
                
                return ResponseEntity.ok(responseDto);
            } else {
                return ResponseEntity.badRequest().body("Invalid payment signature.");
            }
        } catch (RazorpayException e) {
            return ResponseEntity.status(500).body("Error during payment verification.");
        }
    }
}
