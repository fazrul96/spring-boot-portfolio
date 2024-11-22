package com.example.demo.constants;

import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
public final class SecurityConstant {
    public static final String SAMEORIGIN = "SAMEORIGIN";
    public static final String GET = "GET";
    public static final String POST = "POST";
    public static final String PUT = "PUT";
    public static final String DELETE = "DELETE";
    public static final String OPTIONS = "OPTIONS";
    public static final String AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE = "Content-Type";

    public static final String JWK_URI = ".well-known/jwks.json";

    public static final List<String> ALLOWED_ORIGINS = Arrays.asList("http://localhost:3000",
        "https://portfolio-portal.mfzrl.cyou");
    public static final List<String> ALLOWED_METHODS = Arrays.asList(GET, POST, PUT, DELETE, OPTIONS);
    //public static final String[] ALLOWED_HEADERS = {"*"};
    public static final List<String> ALLOWED_HEADERS = Arrays.asList(AUTHORIZATION, CONTENT_TYPE);;
}