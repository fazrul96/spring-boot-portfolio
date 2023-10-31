package com.example.demo.services;

import com.example.demo.models.Skill;
import com.example.demo.services.SkillService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    @Override
    public List<Skill> getSkills() {
        return createListOfSkills();
    }

    private List<Skill> createListOfSkills() {
        List<Skill> skills = new ArrayList<>();

        String[][] skillData = {
            {
                "Web Development",
                "Laravel | CodeIgniter | React | Spring Boot",
            },
            {
                "Programming Languages",
                "PHP | Java | Javascript/Typescript | VBA | C#",
            },
            {
                "Web Services",
                "SQS | CloudWatch | S3 | Lambda | CodePipeline | MinIO | Jenkins",
            },
            {
                "Database Management Systems (DMS)",
                "MySQL | MSSQL | PostgreSQL",
            },
            {
                "Automation Testing",
                "Cypress | Selenium WebDriver | Cucumber",
            }
        };

        // Loop through the skill data and create Skill instances
        for (int id = 1; id <= skillData.length; id++) {
            String[] data = skillData[id - 1]; // Get skill data for the current ID
            skills.add(new Skill(id, data[0], data[1]));
        }

        return skills;
    }
}