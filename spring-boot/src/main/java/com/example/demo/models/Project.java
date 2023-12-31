package com.example.demo.models;

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
    private String[] footer;
//    private int id;
//    private String category;
//    private String title;
//    private String status;
//    private String link;
//    private String image;
//    private String[] tags;
//    public ProjectServiceImpl(int id, String category, String title, String status, String link, String image, String[] tags) {
//        this.id = id;
//        this.category = category;
//        this.title = title;
//        this.status = status;
//        this.link = link;
//        this.image = image;
//        this.tags = tags;
//    }

    public Project(int id, String title, String description, String status, String reference, String img, String[] footer) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.reference = reference;
        this.img = img;
        this.footer = footer;
    }

    // Getters and setters
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

    public String[] getFooter() {
        return footer;
    }

    public void setFooter(String[] footer) {
        this.footer = footer;
    }
}