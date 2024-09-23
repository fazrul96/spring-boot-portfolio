package com.example.demo.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${app.basePath}")
public class HomeController {
    @Value("${app.basePath}")
    private String basePath;

    @GetMapping(path = "test0")
    public void test0(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect(basePath);
    }

    @GetMapping(path = "/")
    public void portfolio(HttpServletResponse httpServletResponse) throws IOException {
        String redirectUrl = basePath + "/getAccessToken?token=" + getAccessToken().getBody();
        httpServletResponse.sendRedirect(redirectUrl);
    }


    @GetMapping(path = "getAccessToken")
    public ResponseEntity<String> getAccessToken() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"client_id\": \"" + "SWi3PPArj7qVBRSCsudK2wFXp9LFGQmS" + "\", \"client_secret\": \""
                + "z0tm-2BsC52TORGrXkChuW_MEWp1WGvksPTkojBnjJ_2P0ndwN6jnguzuOxMiCZE" + "\", \"audience\": \""
                + "https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/" + "\", \"grant_type\": \"client_credentials\"}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://dev-kcm0rrkdks1wi726.us.auth0.com/oauth/token",
                HttpMethod.POST,
                requestEntity,
                String.class);

        return ResponseEntity.ok("Access Token: " + response.getBody());
    }

    @GetMapping(path = "getToken")
    public Map<String, Object> getToken(@AuthenticationPrincipal OidcUser oidcUser) {
        DecodedJWT jwt = decodeIdToken(oidcUser);

        Map<String, Object> response = new HashMap<>();
        if (jwt != null) {
            Map<String, Object> data = extractClaims(jwt);
            response.put("response", "success");
            response.put("message", "JWT verification success");
            response.put("data", data);
        } else {
            response.put("response", "error");
            response.put("message", "JWT verification failed");
        }

        return response;
    }

    private DecodedJWT decodeIdToken(OidcUser oidcUser) {
        String idToken = oidcUser.getIdToken().getTokenValue();
        return JWT.decode(idToken);
    }

    private Map<String, Object> extractClaims(DecodedJWT jwt) {
        Map<String, Object> data = new HashMap<>();
        data.put("name", getStringClaim(jwt, "name"));
        data.put("picture", getStringClaim(jwt, "picture"));
        data.put("email", getStringClaim(jwt, "email"));
        return data;
    }

    private String getStringClaim(DecodedJWT jwt, String claimName) {
        Claim claim = jwt.getClaim(claimName);
        return claim != null ? claim.asString() : null;
    }

    @GetMapping(path = "oidcUser")
    public OidcUser getProfile(@AuthenticationPrincipal OidcUser oidcUser) {
        return oidcUser;
    }

    @GetMapping(path = "generateToken")
    public Map<String, Object> generateToken() {
        String secretKey = "Baeldung"; // Replace with your secret key
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + 360_000_000); // 1 hour expiration

        String userId = "1234"; // Replace with the actual user ID

        String jwtToken = JWT.create()
                .withIssuer("Baeldung")
                .withSubject("Baeldung Details")
                .withClaim("userId", userId)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .withJWTId(UUID.randomUUID().toString())
                .sign(algorithm);

        DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(jwtToken);

        Claim claim = decodedJWT.getClaim("userId");

        // Create a response map with the decoded JWT information
        Map<String, Object> response = new HashMap<>();
        response.put("response", "success");
        response.put("token", jwtToken);
        response.put("issuer", decodedJWT.getIssuer());
        response.put("subject", decodedJWT.getSubject());
        response.put("issuedAt", decodedJWT.getIssuedAt());
        response.put("expiresAt", decodedJWT.getExpiresAt());
        response.put("jwtId", decodedJWT.getId());
        response.put("userIdClaim", claim.asString());

        return response;
    }
}