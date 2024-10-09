package com.example.demo.constants;

public final class SecurityConstant {
    public static final String SAMEORIGIN = "SAMEORIGIN";
    public static final String GET = "GET";
    public static final String POST = "POST";
    public static final String PUT = "PUT";
    public static final String DELETE = "DELETE";
    public static final String OPTIONS = "OPTIONS";

    public static final String ALLOWED_ORIGINS = "http://localhost:3000";
    public static final String[] ALLOWED_METHODS = {GET, POST, PUT, DELETE, OPTIONS};
    public static final String[] ALLOWED_HEADERS = {"*"};

    private SecurityConstant() {
        // Prevent instantiation
    }
}