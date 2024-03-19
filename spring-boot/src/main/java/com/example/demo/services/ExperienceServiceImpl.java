package com.example.demo.services;

import com.example.demo.models.Experience;
import com.example.demo.repositories.ExperienceItemRepository;
import com.example.demo.repositories.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExperienceServiceImpl implements ExperienceService {
    private final ExperienceRepository experienceRepository;
    private final ExperienceItemRepository experienceItemRepository;

    @Autowired
    public ExperienceServiceImpl(
            ExperienceRepository experienceRepository,
            ExperienceItemRepository experienceItemRepository) {
        this.experienceRepository = experienceRepository;
        this.experienceItemRepository = experienceItemRepository;
    }

    @Override
    public List<Experience> getExperiences() {
        return experienceRepository.findAll();
    }

    @Override
    public Experience getExperienceById(String id) {
        Optional<Experience> optionalExperience = experienceRepository.findById(id);
        return optionalExperience.orElse(null);
    }

    public Experience getExperienceByRole(String role) {
        return experienceRepository.findByRole(role);
    }

    @Override
    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    @Override
    public void deleteExperience(String id) {
        experienceRepository.deleteById(id);
    }
}