package com.example.demo.services;

import com.example.demo.models.Experience;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ExperienceService {
    List<Experience> getExperiences();
    List<Map<String, Object>> getExperiencesWithItems();
    Experience getExperienceById(String id);
    Experience saveExperience(Experience experience);
    void deleteExperience(String id);
}