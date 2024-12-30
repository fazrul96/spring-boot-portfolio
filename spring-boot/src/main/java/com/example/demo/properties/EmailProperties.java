package com.example.demo.properties;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
@ConfigurationProperties("spring.mail")
public class EmailProperties {
    private String host;
    private String port;
    private String username;
    private String password;
}
