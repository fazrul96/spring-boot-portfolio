package com.example.demo.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Experience {
    private int id;
    
    @JsonProperty("companyName")
    private String companyName;
    
    @JsonProperty("role")
    private String role;

    @JsonProperty("tag")
    private String tag;
    
    @JsonProperty("year")
    private String year;

    @JsonProperty("duration")
    private String duration;

    @JsonProperty("image")
    private String image;

    @JsonProperty("items")
    private List<ExperienceItem> items;

    public Experience(int id, String companyName, String role, String tag, String year, String duration, String image, List<ExperienceItem> items) {
        this.id = id;
        this.companyName = companyName;
        this.role = role;
        this.tag = tag;
        this.year = year;
        this.duration = duration;
        this.image = image;
        this.items = items;
    }
}