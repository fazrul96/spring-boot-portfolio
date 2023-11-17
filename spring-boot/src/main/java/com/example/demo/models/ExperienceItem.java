package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExperienceItem {
    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    public ExperienceItem(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}