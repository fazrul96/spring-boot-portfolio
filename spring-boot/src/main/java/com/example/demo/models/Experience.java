package com.example.demo.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Experience {
    private int id;
    
    @JsonProperty("companyName")
    private String companyName;
    
    @JsonProperty("role")
    private String role;
    
    @JsonProperty("year")
    private String year;

    @JsonProperty("image")
    private String image;

    @JsonProperty("items")
    private List<ExperienceItem> items;

    public Experience(int id, String companyName, String role, String year, String image, List<ExperienceItem> items) {
        this.id = id;
        this.companyName = companyName;
        this.role = role;
        this.year = year;
        this.image = image;
        this.items = items;
    }

    // Getters and setters
    // ...
}