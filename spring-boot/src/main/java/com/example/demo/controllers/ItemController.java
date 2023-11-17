package com.example.demo.controllers;

import com.example.demo.models.Item;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class ItemController {
    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved items"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("items")
    public List<Item> getItems() {
        List<Item> items = new ArrayList<>();
        items.add(new Item(1L, "Item 1"));
        items.add(new Item(2L, "Item 2"));
        return items;
    }
}