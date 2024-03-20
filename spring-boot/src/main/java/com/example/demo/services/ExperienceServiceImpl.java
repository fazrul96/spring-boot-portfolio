package com.example.demo.services;

import com.example.demo.models.Experience;
import com.example.demo.models.ExperienceItem;
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
    public List<Map<String, Object>> getExperiencesWithItems() {
        List<ExperienceItem> experienceItems = experienceItemRepository.findAll();
        List<Experience> experiences = experienceRepository.findAll();
        Map<String, Map<String, List<Map<String, Object>>>> groupedItems = groupExperienceItems(experienceItems);

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Map<String, List<Map<String, Object>>>> entry : groupedItems.entrySet()) {
            String alias = entry.getKey();
            Experience experience = findExperienceByAlias(experiences, alias);

            Map<String, Object> experienceMap = new LinkedHashMap<>();
            experienceMap.put("alias", alias);
            experienceMap.put("companyName", experience.getCompany_name());
            experienceMap.put("companyType", experience.getCompany_type());
            experienceMap.put("role", experience.getRole());
            experienceMap.put("tag", experience.getTag());
            experienceMap.put("year", experience.getYear());
            experienceMap.put("startDate", experience.getStartdate());
            experienceMap.put("endDate", experience.getEnddate());
            experienceMap.put("duration", experience.getDuration());
            experienceMap.put("image", experience.getImage());

            List<Map<String, Object>> itemsList = new ArrayList<>();
            for (Map.Entry<String, List<Map<String, Object>>> titleEntry : entry.getValue().entrySet()) {
                Map<String, Object> titleMap = new LinkedHashMap<>();
                titleMap.put("title", titleEntry.getKey());
                titleMap.put("items", titleEntry.getValue());
                itemsList.add(titleMap);
            }

            experienceMap.put("items", itemsList);
            result.add(experienceMap);
        }

        return result;
    }

    private Experience findExperienceByAlias(List<Experience> experiences, String alias) {
        for (Experience experience : experiences) {
            if (experience.getAlias().equals(alias)) {
                return experience;
            }
        }
        return null;
    }

    private Map<String, Map<String, List<Map<String, Object>>>> groupExperienceItems(List<ExperienceItem> experienceItems) {
        Map<String, Map<String, List<Map<String, Object>>>> groupedItems = new LinkedHashMap<>();

        for (ExperienceItem experienceItem : experienceItems) {
            String alias = experienceItem.getExperience().getAlias();
            String title = experienceItem.getTitle();

            Map<String, Object> itemMap = new LinkedHashMap<>();
            itemMap.put("id", experienceItem.getId());
            itemMap.put("description", experienceItem.getDescription());

            groupedItems.computeIfAbsent(alias, k -> new LinkedHashMap<>())
                    .computeIfAbsent(title, t -> new ArrayList<>())
                    .add(itemMap);
        }

        return groupedItems;
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