package com.example.demo.model;

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

    @JsonProperty("items")
    private List<ExperienceItem> items;

    public Experience(int id, String companyName, String role, String year, List<ExperienceItem> items) {
        this.id = id;
        this.companyName = companyName;
        this.role = role;
        this.year = year;
        this.items = items;
    }

    // Getters and setters
    // ...
}