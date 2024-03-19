package com.example.demo.services;

import com.example.demo.models.Experience;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExperienceService {
    List<Experience> getExperiences();
    Experience getExperienceById(String id);
    Experience saveExperience(Experience experience);
    void deleteExperience(String id);
}