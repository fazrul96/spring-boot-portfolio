package com.example.demo.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class HelloController {
    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Hello")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "hello")
    public String sayHello() {
        return "Hello from the backend!";
    }
}
