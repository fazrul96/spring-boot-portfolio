package com.example.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hello")
public class HelloController {

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public String sayHello() {
        return "Hello from the backend!";
    }
}
