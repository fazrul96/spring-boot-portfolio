package com.example.demo.config;

import com.example.demo.properties.AppProperties;
import com.example.demo.properties.AuthProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

import static com.example.demo.constants.GeneralConstant.DOUBLE_ASTERISKS;
import static com.example.demo.constants.GeneralConstant.SLASH;
import static com.example.demo.constants.SecurityConstant.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Value("${spring.profiles.active}")
    private String activeProfile;

    public final AuthProperties authProperties;
    public final AppProperties appProperties;
    public static final String WILDCARD_PATH = SLASH + DOUBLE_ASTERISKS;
    public static final String LOCAL = "local";

    public SecurityConfiguration(
        AuthProperties authProperties,
        AppProperties appProperties) {
        this.authProperties = authProperties;
        this.appProperties = appProperties;
    }

    @Bean
    public HeaderWriter xFrameOptionsHeaderWriter() {
        return new StaticHeadersWriter("X-Frame-Options", SAMEORIGIN);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        configureAuthorization(http);
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwkSetUri(authProperties.getIssuer() + JWK_URI)))
            .logout(logout -> logout.addLogoutHandler(logoutHandler()))
            .headers(headers -> headers.addHeaderWriter(xFrameOptionsHeaderWriter())
        );
        return http.build();
    }

    public void configureAuthorization (HttpSecurity http) throws Exception {
        if (LOCAL.equals(activeProfile)) {
            http.authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll());
        } else {
            http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(appProperties.getPrivateApiPath() + WILDCARD_PATH).authenticated()
                .requestMatchers(appProperties.getPublicApiPath() + WILDCARD_PATH).permitAll()
                .anyRequest().authenticated()
            );
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ALLOWED_ORIGINS);
        configuration.setAllowedMethods(ALLOWED_METHODS);
        configuration.setAllowedHeaders(ALLOWED_HEADERS);
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(WILDCARD_PATH, configuration);
        return source;
    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
                String finalUrl = authProperties.getIssuer() + "v2/logout?client_id="
                        + authProperties.getClientId() + "&returnTo=" + baseUrl;
                response.sendRedirect(finalUrl);
            } catch (IOException e) {
                // todo add custom exception in here
                throw new RuntimeException("Logout failed", e);
            }
        };
    }
}