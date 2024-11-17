package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.ExperienceItem;
import com.example.demo.data.portfolio.repository.ExperienceItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@SuppressWarnings({"PMD.AvoidInstantiatingObjectsInLoops"})
public class ExperienceItemService {
    private final ExperienceItemRepository experienceItemRepository;

    @Autowired
    public ExperienceItemService(ExperienceItemRepository experienceItemRepository) {
        this.experienceItemRepository = experienceItemRepository;
    }

    public List<ExperienceItem> getExperienceItems() {
        return experienceItemRepository.findAll();
    }

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

    public ExperienceItem getExperienceItemById(String id) {
        Optional<ExperienceItem> optionalExperienceItem = experienceItemRepository.findById(id);
        return optionalExperienceItem.orElse(null);
    }

    public ExperienceItem getExperienceItemByTitle(String title) {
        return experienceItemRepository.findByTitle(title);
    }

    public ExperienceItem saveExperienceItem(ExperienceItem experience) {
        return experienceItemRepository.save(experience);
    }

    public void deleteExperienceItem(String id) {
        experienceItemRepository.deleteById(id);
    }
}