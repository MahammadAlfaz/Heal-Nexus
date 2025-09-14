package com.healthcare.controller;

import com.healthcare.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"})
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/query")
    public Mono<ResponseEntity<Map<String, String>>> queryAI(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        String language = request.get("language");

        if (message == null || message.trim().isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body(Map.of("error", "Message is required")));
        }

        if (language == null) {
            language = "english";
        }

        return aiService.queryAI(message, language)
                .map(response -> ResponseEntity.ok(Map.of("response", response)))
                .onErrorResume(e -> Mono.just(ResponseEntity.internalServerError().body(Map.of("error", "Failed to process AI query"))));
    }
}
