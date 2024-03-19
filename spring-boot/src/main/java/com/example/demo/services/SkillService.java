package com.example.demo.services;

import com.example.demo.models.Skill;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface SkillService {
    List<Skill> getSkills();
    Skill getSkillById(String id);
    Skill saveSkill(Skill skill);
    void deleteSkill(String id);
}