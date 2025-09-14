package com.healthcare.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class AiService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    public AiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> queryAI(String userMessage, String language) {
        // Prepare the request body for Gemini API
        Map<String, Object> part = new HashMap<>();
        String promptWithLanguage = "Please respond in " + language + ". " + userMessage;
        part.put("text", promptWithLanguage);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", new Map[]{part});

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", new Map[]{content});

        return webClient.post()
                .uri(geminiApiUrl)
                .header("X-goog-api-key", geminiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    // Log the full response for debugging
                    System.out.println("Gemini API response: " + response);

                    // Extract the AI response from the Gemini API response
                    try {
                        var candidates = (java.util.List<Map<String, Object>>) response.get("candidates");
                        if (candidates != null && !candidates.isEmpty()) {
                            Map<String, Object> candidate = candidates.get(0);
                            Map<String, Object> contentMap = (Map<String, Object>) candidate.get("content");
                            if (contentMap != null) {
                                var parts = (java.util.List<Map<String, Object>>) contentMap.get("parts");
                                if (parts != null && !parts.isEmpty()) {
                                    Map<String, Object> partMap = parts.get(0);
                                    return (String) partMap.get("text");
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return "Sorry, I couldn't process your request.";
                })
                .doOnError(error -> {
                    System.err.println("Error calling Gemini API: " + error.getMessage());
                    error.printStackTrace();
                });
    }
}
