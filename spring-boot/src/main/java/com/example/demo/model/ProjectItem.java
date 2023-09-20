package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProjectItem {
    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("reference")
    private String reference;

    public ProjectItem(String title, String description, String reference) {
        this.title = title;
        this.description = description;
        this.reference = reference;
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

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
}