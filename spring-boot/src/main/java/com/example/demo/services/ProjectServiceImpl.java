package com.example.demo.services;

import com.example.demo.models.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Override
    public List<Project> getProjects() {
        return createListOfProjects();
    }

    private List<Project> createListOfProjects() {
        List<Project> projects = new ArrayList<>();
    
        String[][] projectData = {
            {
                "Web Development",
                "Laravel Project",
                "Still in development",
                "./pages/web-development-page.html",
                "https://th.bing.com/th/id/R.3548e421c01b0f748bff76499bc26601?rik=2VM1RoPhaP%2f52w&riu=http%3a%2f%2fdarrenstephenson.ie%2fwp-content%2fuploads%2f2015%2f03%2flaravel-logo.png&ehk=jLAh49QKn3bN%2fSAYBiw%2foznFMvmLKdLV8DTiwMJc3vg%3d&risl=&pid=ImgRaw&r=0",
                "#intelligentfood"
            },
            {
                "University Eclipse Collection",
                "Java Project",
                "Still in development",
                "./pages/eclipse-page.html",
                "https://getwallpapers.com/wallpaper/full/b/2/0/491662.jpg",
                "#intelligentfood"
            },
            {
                "3D Game",
                "Unity Project",
                "Still in development",
                "./pages/unity-page.html",
                "https://images.squarespace-cdn.com/content/v1/5f031aa98cea4c639ef3f14f/1628960759502-QD0B2LMTGQHDAAC3DY42/Unity.jpeg",
                "#intelligentfood"
            },
            {
                "Python Assessment",
                "Python Project",
                "Still in development",
                "./pages/python-page.html",
                "https://miro.medium.com/max/3960/1*taf9WHc3BPmhbxyKEu2jIg.png",
                "#intelligentfood"
            },
            {
                "Automated Testing",
                "Automation",
                "Still in development",
                "./pages/automation-page.html",
                "https://blog.aspiresys.com/wp-content/uploads/2017/12/shutterstock_727680178.jpg",
                "#intelligentfood"
            }
        };
    
        // Loop through the project data and create Project instances
        for (int id = 1; id <= projectData.length; id++) {
            String[] data = projectData[id - 1];
            projects.add(new Project(id, data[0], data[1], data[2], data[3], data[4], data[5]));
        }
    
        return projects;
    }
}
