package com.example.demo.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class HelloController {
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "hello")
    public String sayHello() {
        return "Hello from the backend!";
    }
}
