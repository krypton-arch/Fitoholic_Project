// File: src/main/java/com/fitoholic/api/dto/PaymentVerificationRequest.java
package com.fitoholic.api.dto;
import lombok.Data;
@Data
public class PaymentVerificationRequest {
    private String razorpay_order_id;
    private String razorpay_payment_id;
    private String razorpay_signature;
}
