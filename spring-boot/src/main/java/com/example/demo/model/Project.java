package com.example.demo.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Project {
    private int id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("status")
    private String status;

    @JsonProperty("reference")
    private String reference;

    @JsonProperty("img")
    private String img;

    @JsonProperty("footer")
    private String footer;

    @JsonProperty("items")
    private List<ProjectItem> items;

    public Project(int id, String title, String description, String status, String reference, String img, String footer,
            List<ProjectItem> items) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.reference = reference;
        this.img = img;
        this.footer = footer;
        this.items = items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getFooter() {
        return footer;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }
}