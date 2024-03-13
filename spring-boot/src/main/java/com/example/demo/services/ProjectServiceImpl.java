package com.example.demo.services;

import com.example.demo.models.Experience;
import com.example.demo.models.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Override
    public List<Project> getProjects() {
        return createListOfProjects();
    }

    private static String arrayToString(String[] array) {
        return String.join(", ", array);
    }

    private static String[][] getProjectData() {
        String[] LaravelTags = {"Web Development", "PHP", "Laravel"};
        String[] LaravelProjects = {"Intelligentfood"};

        String[] JavaTags = {"Web Development", "Java", "React"};
        String[] JavaProjects = {"Portfolio"};

        String[] UnityTags = {"Game Development", "Unity", "C#"};
        String[] UnityProjects = {"3D Game"};

        String[] PythonTags = {"Python", "API", "AWS"};
        String[] PythonProjects = {"Python Assessment"};

        String[] AutomationTags = {"Javascript", "Typescript" ,"Cucumber"};
        String[] AutomationDesc = {"Cypress-ACN is a robust telco automation framework built with Cypress and [TypeScript]. It empowers end-to-end testing for telco systems across multiple environments, including local, development (dev), and pre-production (preprod). The framework follows a structured file format that promotes reusability in other test specifications."};
        String[] AutomationProjects = {"Telco Automation Framework"};

        String LaravelTagsString = arrayToString(LaravelTags);
        String LaravelProjectsString = arrayToString(LaravelProjects);

        String JavaTagsString = arrayToString(JavaTags);
        String JavaProjectsString = arrayToString(JavaProjects);

        String UnityTagsString = arrayToString(UnityTags);
        String UnityProjectsString = arrayToString(UnityProjects);

        String PythonTagsString = arrayToString(PythonTags);
        String PythonProjectsString = arrayToString(PythonProjects);

        String AutomationTagsString = arrayToString(AutomationTags);
        String AutomationDescString = arrayToString(AutomationDesc);
        String AutomationProjectsString = arrayToString(AutomationProjects);

        return new String[][] {
            {
                "LaravelCraft",
                "",
                "Still in development",
                "./pages/web-development-page.html",
                "https://wallpapercave.com/wp/wp6878772.png",
                LaravelProjectsString,
                LaravelTagsString,
            },
            {
                "JavaCatalyst",
                "",
                "Still in development",
                "./pages/eclipse-page.html",
                "https://getwallpapers.com/wallpaper/full/b/2/0/491662.jpg",
                JavaProjectsString,
                JavaTagsString,
            },
            {
                "UnityRealm",
                "",
                "Still in development",
                "./pages/unity-page.html",
                "https://images.squarespace-cdn.com/content/v1/5f031aa98cea4c639ef3f14f/1628960759502-QD0B2LMTGQHDAAC3DY42/Unity.jpeg",
                UnityProjectsString,
                UnityTagsString,
            },
            {
                "PythonNimbus",
                "",
                "Still in development",
                "./pages/python-page.html",
                "https://miro.medium.com/max/3960/1*taf9WHc3BPmhbxyKEu2jIg.png",
                PythonProjectsString,
                PythonTagsString,
            },
            {
                "AutoSphere",
                AutomationDescString,
                "Completed",
                "./pages/automation-page.html",
                "https://blog.aspiresys.com/wp-content/uploads/2017/12/shutterstock_727680178.jpg",
                AutomationProjectsString,
                AutomationTagsString,
            }
        };
    }
    private List<Project> createListOfProjects() {
        List<Project> projects = new ArrayList<>();
        int id = 1;

        for (String[] data : getProjectData()) {
            String[] lists = {data[5]}; // Convert the last string to an array
            String[] tags = {data[6]}; // Convert the last string to an array
            projects.add(new Project(id++, data[0], data[1], data[2], data[3], data[4], lists, tags));
        }

        return projects;
    }
}
