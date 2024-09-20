package com.example.demo.service.modules;

import com.example.demo.data.entity.Skill;
import com.example.demo.data.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillById(Integer id) {
        Optional<Skill> optionalSkill = skillRepository.findById(id);
        return optionalSkill.orElse(null);
    }

    public Skill getSkillByName(String name) {
        return skillRepository.findByName(name);
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkill(Integer id) {
        skillRepository.deleteById(id);
    }
}