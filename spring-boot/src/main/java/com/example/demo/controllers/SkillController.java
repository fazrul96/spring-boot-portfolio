package com.example.demo.controllers;

import com.example.demo.entity.Skill;
import com.example.demo.services.modules.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class SkillController {
    private final SkillService skillService;
    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    @Operation(summary = "Get list of skills")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved skills"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getSkills")
    public List<Skill> getSkills() {
        return skillService.getSkills();
    }

    @Operation(summary = "Get list of skills using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved skills using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getSkills/{id}")
    public Skill getSkillById(@PathVariable Integer id) {
        return skillService.getSkillById(id);
    }

    @PostMapping(path = "postSkills")
    public Skill saveSkill(@RequestBody Skill skill) {
        return skillService.saveSkill(skill);
    }

    @DeleteMapping(path = "deleteSkills/{id}")
    public void deleteSkill(@PathVariable Integer id) {
        skillService.deleteSkill(id);
    }
}