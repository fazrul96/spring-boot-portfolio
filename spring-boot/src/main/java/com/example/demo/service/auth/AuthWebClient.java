package com.example.demo.service.auth;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@AllArgsConstructor
@Slf4j
public class AuthWebClient {
    private final WebClient webClient;

    public byte[] initiateWebtoonRequest(String endpoint, MultiValueMap<String, Object> requestBody) {
        log.info("Requesting webtoon operation at endpoint: {}", endpoint);
        try {
            return webClient.post()
                    .uri(endpoint)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
        } catch (Exception e) {
            log.error("Failed to process webtoon request at endpoint {}: {}", endpoint, e.getMessage());
            throw new RuntimeException("Failed to process webtoon request", e);
        }
    }
}