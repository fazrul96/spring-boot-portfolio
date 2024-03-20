package com.example.demo.services;

import com.example.demo.models.ExperienceItem;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ExperienceItemService {
    List<ExperienceItem> getExperienceItems();

    List<Map<String, Object>> getExperienceItemsByTitle();

    ExperienceItem getExperienceItemById(String id);
    ExperienceItem saveExperienceItem(ExperienceItem experience);
    void deleteExperienceItem(String id);

    ExperienceItem getExperienceItemByTitle(String title);
}