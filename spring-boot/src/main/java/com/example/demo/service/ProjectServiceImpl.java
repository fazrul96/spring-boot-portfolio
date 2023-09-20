package com.example.demo.service;

import com.example.demo.model.Project;
import com.example.demo.model.ProjectItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

        @Override
        public List<Project> getProjects() {
                List<Project> projects = new ArrayList<>();

                projects.add(createWebProject());
                projects.add(createJavaProject());
                projects.add(createUnityProject());
                projects.add(createPythonProject());
                projects.add(createAutomationProject());

                return projects;
        }

        private Project createWebProject() {
                return new Project(
                                1,
                                "Web Development",
                                "Laravel Project",
                                "Still in development",
                                "./pages/web-development-page.html",
                                "https://th.bing.com/th/id/R.3548e421c01b0f748bff76499bc26601?rik=2VM1RoPhaP%2f52w&riu=http%3a%2f%2fdarrenstephenson.ie%2fwp-content%2fuploads%2f2015%2f03%2flaravel-logo.png&ehk=jLAh49QKn3bN%2fSAYBiw%2foznFMvmLKdLV8DTiwMJc3vg%3d&risl=&pid=ImgRaw&r=0",
                                "#web",
                                createItemsWebProject());
        }

        private Project createJavaProject() {
                return new Project(
                                2,
                                "University Eclipse Collection",
                                "Java Project",
                                "Still in development",
                                "./pages/eclipse-page.html",
                                "https://getwallpapers.com/wallpaper/full/b/2/0/491662.jpg",
                                "#java",
                                createItemsJavaProject());
        }

        private Project createUnityProject() {
                return new Project(
                                3,
                                "3D Game",
                                "Unity Project",
                                "Still in development",
                                "./pages/unity-page.html",
                                "https://images.squarespace-cdn.com/content/v1/5f031aa98cea4c639ef3f14f/1628960759502-QD0B2LMTGQHDAAC3DY42/Unity.jpeg",
                                "#unity",
                                createItemsUnityProject());
        }

        private Project createPythonProject() {
                return new Project(
                                4,
                                "Python Assessment",
                                "Python Project",
                                "Still in development",
                                "./pages/python-page.html",
                                "https://miro.medium.com/max/3960/1*taf9WHc3BPmhbxyKEu2jIg.png",
                                "#python",
                                createItemsPythonProject());
        }

        private Project createAutomationProject() {
                return new Project(
                                5,
                                "Automated Testing",
                                "Automation",
                                "Still in development",
                                "./pages/automation-page.html",
                                "https://blog.aspiresys.com/wp-content/uploads/2017/12/shutterstock_727680178.jpg",
                                "#automation",
                                createItemsAutomationProject());
        }

        private List<ProjectItem> createItemsWebProject() {
                List<ProjectItem> items = new ArrayList<>();

                items.add(new ProjectItem(
                                "Intelligent Food",
                                "React + Spring Boot",
                                "#"));
                items.add(new ProjectItem(
                                "Portfolio",
                                "React + Spring Boot",
                                "#"));
                return items;
        }

        private List<ProjectItem> createItemsJavaProject() {
                List<ProjectItem> items = new ArrayList<>();

                items.add(new ProjectItem(
                                "Chatbot",
                                "The Chatbot project demonstrates the implementation of a simple TCP-based chat application, allowing users to communicate and exchange messages over a network",
                                "#"));
                items.add(new ProjectItem(
                                "Puzzle",
                                "The Puzzle project involves a TCP-based puzzle game, where players can compete against each other to solve puzzles and achieve the fastest completion time",
                                "#"));
                items.add(new ProjectItem(
                                "Tower Defense",
                                "The Tower Defense project showcases a TCP-based tower defense game, where players strategically place towers to defend against waves of enemy attacks",
                                "#"));

                return items;
        }

        private List<ProjectItem> createItemsUnityProject() {
                List<ProjectItem> items = new ArrayList<>();

                items.add(new ProjectItem(
                                "Aeroplane",
                                "The Aeroplane Game project is an exciting 3D game that simulates flying an airplane through challenging obstacles. It features intuitive controls, immersive visuals, and thrilling gameplay elements. The project demonstrates my proficiency in implementing player controls, physics-based movement, and game mechanics specific to aerial gameplay",
                                "#"));
                items.add(new ProjectItem(
                                "Truck Crash",
                                "The Truck Crash Game project is an action-packed 2D game where players control a truck and navigate through various environments while causing maximum destruction. It emphasizes realistic physics and dynamic destruction effects. The project showcases my ability to create engaging 2D gameplay, implement physics-based interactions, and create visually impressive destruction simulations.",
                                "#"));

                return items;
        }

        private List<ProjectItem> createItemsPythonProject() {
                List<ProjectItem> items = new ArrayList<>();

                items.add(new ProjectItem(
                                "Makers",
                                "The Makers project showcases my implementation of various Python utilities and scripts. It includes tools for data manipulation, file handling, automation tasks, or any other utilities that I have created to simplify my workflow or solve specific problems. The project demonstrates my proficiency in Python programming and the ability to develop practical solutions",
                                "#"));
                items.add(new ProjectItem(
                                "OpenCV",
                                "The OpenCV project focuses on computer vision and image processing tasks using the OpenCV library in Python. It includes examples, tutorials, or applications that utilize OpenCV functionalities such as image recognition, object detection, image filtering, and more. The project demonstrates my expertise in computer vision and the application of OpenCV in Python",
                                "#"));

                return items;
        }

        private List<ProjectItem> createItemsAutomationProject() {
                List<ProjectItem> items = new ArrayList<>();

                items.add(new ProjectItem(
                                "Logistic",
                                "The Logistic Automation System is a comprehensive solution aimed at streamlining and optimizing logistic operations. Leveraging cutting-edge technologies, this project integrates automated tracking, real-time monitoring, and efficient route planning to enhance the efficiency and accuracy of logistics processes. By automating key tasks such as order processing, inventory management, and delivery tracking, the Logistic Automation System improves operational efficiency, reduces human errors, and ensures timely and reliable deliveries, ultimately leading to higher customer satisfaction.",
                                "https://github.com/fazrul96/Cypress-TheLorry"));
                items.add(new ProjectItem(
                                "Telecommunication",
                                "In this project, I developed automated test scripts using the Cypress framework to ensure the reliability and functionality of a telecommunication application. By simulating user interactions and testing various scenarios, the Cypress automation suite helps identify bugs and potential issues early in the development cycle. This project not only enhances the quality of the telecommunication application but also contributes to faster release cycles and improved user experiences.",
                                "https://github.com/fazrul96/Cypress-ACN"));
                return items;
        }
}