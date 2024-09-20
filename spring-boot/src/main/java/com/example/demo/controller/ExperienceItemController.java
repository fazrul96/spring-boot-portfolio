package com.example.demo.controller;

import com.example.demo.data.entity.ExperienceItem;
import com.example.demo.service.modules.ExperienceItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ExperienceItemController {
    private final ExperienceItemService experienceItemService;

    @Autowired
    public ExperienceItemController(ExperienceItemService experienceItemService) {
        this.experienceItemService = experienceItemService;
    }

    @Operation(summary = "Get list of experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperienceItems")
    public List<ExperienceItem> getExperienceItems() {
        return experienceItemService.getExperienceItems();
    }

    @Operation(summary = "Get list of experience item using title")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experience item using title"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperienceItemsByTitle")
    public List<Map<String, Object>> getExperienceItemsByTitle() {
        return experienceItemService.getExperienceItemsByTitle();
    }

    @Operation(summary = "Get list of experience item using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experience item using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperienceItems/{id}")
    public ExperienceItem getExperienceItemById(@PathVariable String id) {
        return experienceItemService.getExperienceItemById(id);
    }

    @PostMapping(path = "postExperienceItems")
    public ExperienceItem saveExperienceItem(@RequestBody ExperienceItem experience) {
        return experienceItemService.saveExperienceItem(experience);
    }

    @DeleteMapping(path = "deleteExperienceItems/{id}")
    public void deleteExperienceItem(@PathVariable String id) {
        experienceItemService.deleteExperienceItem(id);
    }
}