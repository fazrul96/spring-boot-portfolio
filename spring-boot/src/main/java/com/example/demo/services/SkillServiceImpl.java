package com.example.demo.services;

import com.example.demo.models.Skill;
import com.example.demo.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;

    @Autowired
    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Skill getSkillById(String id) {
        Optional<Skill> optionalSkill = skillRepository.findById(id);
        return optionalSkill.orElse(null);
    }

    public Skill getSkillByName(String name) {
        return skillRepository.findByName(name);
    }

    @Override
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public void deleteSkill(String id) {
        skillRepository.deleteById(id);
    }
}