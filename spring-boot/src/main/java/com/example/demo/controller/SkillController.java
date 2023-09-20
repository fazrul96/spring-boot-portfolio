package com.example.demo.controller;

import com.example.demo.model.Skill;
import com.example.demo.service.SkillService;
import com.example.demo.service.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getSkills")
public class SkillController {
    private final SkillService skillService;
    private final AppConfig appConfig;

    public SkillController(SkillService skillService, AppConfig appConfig) {
        this.skillService = skillService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public List<Skill> getSkills() {
        return skillService.getSkills();
    }
}