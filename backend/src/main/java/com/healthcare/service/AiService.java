package com.healthcare.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.healthcare.dto.GeminiRequest;
import com.healthcare.dto.GeminiResponse;


import reactor.core.publisher.Mono;

@Service
public class AiService {

    private final WebClient webClient;

    private static final Logger logger = LoggerFactory.getLogger(AiService.class);

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    public AiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> queryAI(String userMessage, String language) {
        String promptWithLanguage = "Please respond in " + language + ". " + userMessage;
        GeminiRequest requestBody = new GeminiRequest(promptWithLanguage);

        return webClient.post()
                .uri(geminiApiUrl)
                .header("x-goog-api-key", geminiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .map(response -> {
                    logger.debug("Gemini API response: {}", response);
                    return Optional.ofNullable(response.getCandidates())
                            .flatMap(candidates -> candidates.stream().findFirst())
                            .map(GeminiResponse.Candidate::getContent)
                            .map(GeminiResponse.Content::getParts)
                            .flatMap(parts -> parts.stream().findFirst())
                            .map(GeminiResponse.Part::getText)
                            .orElse("Sorry, I couldn't process your request.");
                })
                .onErrorResume(WebClientResponseException.class, ex -> {
                    logger.error("Error from Gemini API. Status: {}, Body: {}", ex.getStatusCode(), ex.getResponseBodyAsString());
                    if (ex.getStatusCode().value() == 429) {
                        return Mono.just("AI service is currently rate limited. Please try again later.");
                    }
                    return Mono.just("Sorry, there was an error communicating with the AI service. Status: " + ex.getStatusCode());
                })
                .onErrorResume(Exception.class, ex -> {
                    logger.error("An unexpected error occurred while calling Gemini API: {}", ex.getMessage());
                    return Mono.just("Sorry, an unexpected error occurred.");
                });
    }
}
