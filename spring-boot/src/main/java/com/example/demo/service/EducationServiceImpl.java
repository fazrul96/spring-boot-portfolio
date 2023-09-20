package com.example.demo.service;

import com.example.demo.model.Education;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    @Override
    public List<Education> getEducations() {
        return createListOfEducations();
    }

    private List<Education> createListOfEducations() {
        List<Education> educations = new ArrayList<>();

        String[][] educationData = {
                {
                        "National University of Malaysia (UKM)",
                        "Bachelor of Software Engineering (Information Systems)",
                        "2015 - 2019"
                },
                {
                        "Another University",
                        "Another Degree",
                        "Start Year - End Year"
                }
                // Add more education data here if needed
        };

        // Loop through the education data and create Education instances
        for (int id = 1; id <= educationData.length; id++) {
            String[] data = educationData[id - 1]; // Get education data for the current ID
            educations.add(new Education(id, data[0], data[1], data[2]));
        }

        return educations;
    }
}