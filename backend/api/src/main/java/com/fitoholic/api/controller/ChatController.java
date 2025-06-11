package com.fitoholic.api.controller;

import com.fitoholic.api.model.User;
import com.fitoholic.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    @Value("${gemini.api.key}") private String geminiApiKey;
    @Value("${gemini.api.url}") private String geminiApiUrl;
    private final UserRepository userRepository;
    public record ChatRequest(String prompt) {}
    public record ChatResponse(String response) {}

    @PostMapping
    public ResponseEntity<?> chatWithFitto(@RequestBody ChatRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(()-> new IllegalStateException("User not found"));
        if (!user.isHasPremiumAccess()) {
            return ResponseEntity.status(403).body("Access to the Fitto AI chatbot is a premium feature.");
        }
        RestTemplate restTemplate = new RestTemplate();
        String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String systemPrompt = "You are Fitto, a helpful and encouraging fitness and nutrition chatbot for an Indian audience. Keep responses concise and motivating. User's question: %s";
        String fullPrompt = String.format(systemPrompt, request.prompt().replace("\"", "'"));
        JSONObject textPart = new JSONObject(); textPart.put("text", fullPrompt);
        JSONObject content = new JSONObject(); content.put("parts", new JSONArray().put(textPart));
        JSONObject requestBody = new JSONObject(); requestBody.put("contents", new JSONArray().put(content));
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        try {
            ResponseEntity<String> geminiResponse = restTemplate.postForEntity(fullUrl, entity, String.class);
            String responseText = "Sorry, I couldn't generate a response.";
            if (geminiResponse.getBody() != null) {
                try {
                    JSONObject responseJson = new JSONObject(geminiResponse.getBody());
                    responseText = responseJson.getJSONArray("candidates").getJSONObject(0).getJSONObject("content").getJSONArray("parts").getJSONObject(0).getString("text");
                } catch (Exception e) { System.err.println("Error parsing Gemini response: " + e.getMessage()); }
            }
            return ResponseEntity.ok(new ChatResponse(responseText.trim()));
        } catch (Exception e) { return ResponseEntity.internalServerError().body("Failed to communicate with the AI service."); }
    }
}
