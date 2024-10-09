package com.example.demo.controller;

import com.example.demo.data.entity.Skill;
import com.example.demo.service.modules.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.publicApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class SkillController {
    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @Operation(summary = "Retrieve a list of skills")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved skills"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }

    @Operation(summary = "Retrieve a skill by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the skill"),
            @ApiResponse(responseCode = "404", description = "Skill not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "skills/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Integer id) {
        Skill skill = skillService.getSkillById(id);
        return skill != null ? ResponseEntity.ok(skill) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Create a new skill")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created skill"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        Skill createdSkill = skillService.saveSkill(skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSkill);
    }

    @Operation(summary = "Delete a skill by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the skill"),
            @ApiResponse(responseCode = "404", description = "Skill not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Integer id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
