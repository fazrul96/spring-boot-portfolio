package com.example.demo.services;

import com.example.demo.models.ExperienceItem;
import com.example.demo.repositories.ExperienceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExperienceItemServiceImpl implements ExperienceItemService {
    private final ExperienceItemRepository experienceItemRepository;

    @Autowired
    public ExperienceItemServiceImpl(ExperienceItemRepository experienceItemRepository) {
        this.experienceItemRepository = experienceItemRepository;
    }

    @Override
    public List<ExperienceItem> getExperienceItems() {
        return experienceItemRepository.findAll();
    }

    @Override
    public List<Map<String, Object>> getExperienceItemsByTitle() {
        List<ExperienceItem> experienceItems = experienceItemRepository.findAll();
        Map<String, List<Map<String, Object>>> groupedItems = new LinkedHashMap<>();

        for (ExperienceItem experienceItem : experienceItems) {
            String title = experienceItem.getTitle();

            Map<String, Object> itemMap = new LinkedHashMap<>();
            itemMap.put("id", experienceItem.getId());
            itemMap.put("description", experienceItem.getDescription());

            if (!groupedItems.containsKey(title)) {
                groupedItems.put(title, new ArrayList<>());
            }

            groupedItems.get(title).add(itemMap);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<Map<String, Object>>> entry : groupedItems.entrySet()) {
            Map<String, Object> groupMap = new LinkedHashMap<>();
            groupMap.put("title", entry.getKey());
            groupMap.put("items", entry.getValue());
            result.add(groupMap);
        }

        return result;
    }

    @Override
    public ExperienceItem getExperienceItemById(String id) {
        Optional<ExperienceItem> optionalExperienceItem = experienceItemRepository.findById(id);
        return optionalExperienceItem.orElse(null);
    }

    public ExperienceItem getExperienceItemByTitle(String title) {
        return experienceItemRepository.findByTitle(title);
    }

    @Override
    public ExperienceItem saveExperienceItem(ExperienceItem experience) {
        return experienceItemRepository.save(experience);
    }

    @Override
    public void deleteExperienceItem(String id) {
        experienceItemRepository.deleteById(id);
    }
}