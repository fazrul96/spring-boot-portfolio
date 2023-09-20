package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Skill {
    private int id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("name")
    private String name;

    public Skill(int id, String title, String name) {
        this.id = id;
        this.title = title;
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}