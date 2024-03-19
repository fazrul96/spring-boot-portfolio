package com.example.demo.controllers;

import com.example.demo.models.ExperienceItem;
import com.example.demo.services.AppConfig;
import com.example.demo.services.ExperienceItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class ExperienceItemController {
    private final ExperienceItemService experienceItemService;
    private final AppConfig appConfig;

    @Autowired
    public ExperienceItemController(ExperienceItemService experienceItemService, AppConfig appConfig) {
        this.experienceItemService = experienceItemService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperienceItems")
    public List<Map<String, Object>> getExperienceItems() {
        return experienceItemService.getExperienceItems();
    }

    @GetMapping(path = "getExperienceItems/{id}")
    public ExperienceItem getExperienceItemById(@PathVariable String id) {
        return experienceItemService.getExperienceItemById(id);
    }

//    @GetMapping(path = "getExperienceItems/{title}")
//    public ExperienceItem getExperienceItemByTitle(@PathVariable String title) {
//        return experienceItemService.getExperienceItemByTitle(title);
//    }

    @PostMapping(path = "postExperienceItems")
    public ExperienceItem saveExperienceItem(@RequestBody ExperienceItem experience) {
        return experienceItemService.saveExperienceItem(experience);
    }

    @DeleteMapping(path = "deleteExperienceItems/{id}")
    public void deleteExperienceItem(@PathVariable String id) {
        experienceItemService.deleteExperienceItem(id);
    }
}