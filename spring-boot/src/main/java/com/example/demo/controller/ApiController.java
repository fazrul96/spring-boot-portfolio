package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/v2/")
    public String publicApi() {
        return "This is a public API endpoint.";
    }

    @GetMapping("/v1/")
    public String privateApi() {
        return "This is a private endpoint. You are authenticated.";
    }
}