package com.example.demo.controllers;

import com.example.demo.models.Skill;
import com.example.demo.services.SkillService;
import com.example.demo.services.AppConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class SkillController {
    private final SkillService skillService;
    private final AppConfig appConfig;

    public SkillController(SkillService skillService, AppConfig appConfig) {
        this.skillService = skillService;
        this.appConfig = appConfig;
    }
    @Operation(summary = "Get list of skills")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved skills"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "getSkills")
    public List<Skill> getSkills() {
        return skillService.getSkills();
    }
}