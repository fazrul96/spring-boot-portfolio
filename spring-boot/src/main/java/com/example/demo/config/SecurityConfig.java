package com.example.demo.config;

import com.example.demo.constants.SecurityConstant;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.List;

import static com.example.demo.constants.GeneralConstant.DOUBLE_ASTERISKS;
import static com.example.demo.constants.GeneralConstant.SLASH;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@NoArgsConstructor
@CrossOrigin(origins = "${app.basePath}")
public class SecurityConfig {

    @Value("${okta.oauth2.issuer}")
    private String issuer;

    @Value("${okta.oauth2.client-id}")
    private String clientId;

    @Value("${app.publicApiPath}")
    private String publicApiPath;

    @Value("${app.privateApiPath}")
    private String privateApiPath;

    @Bean
    public HeaderWriter xFrameOptionsHeaderWriter() {
        return new StaticHeadersWriter("X-Frame-Options", SecurityConstant.SAMEORIGIN);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(privateApiPath + DOUBLE_ASTERISKS).authenticated()
                .requestMatchers(publicApiPath + DOUBLE_ASTERISKS).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwkSetUri(issuer + ".well-known/jwks.json")
                )
            )
            .oauth2Login(withDefaults())
            .logout(logout -> logout
                .addLogoutHandler(logoutHandler())
            )
            .headers(headers -> headers
                .addHeaderWriter(xFrameOptionsHeaderWriter())
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of(SecurityConstant.ALLOWED_ORIGINS));
        corsConfiguration.setAllowedMethods(List.of(SecurityConstant.ALLOWED_METHODS));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(List.of(SecurityConstant.ALLOWED_HEADERS));
        corsConfiguration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(SLASH + DOUBLE_ASTERISKS, corsConfiguration);

        return source;
    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
                String finalUrl = issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl;
                response.sendRedirect(finalUrl);
            } catch (IOException e) {
                // todo add custom exception in here
                throw new RuntimeException("Logout failed", e);
            }
        };
    }
}
