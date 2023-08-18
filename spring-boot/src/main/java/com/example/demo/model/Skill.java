package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Skill {
    private int id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("module")
    private String module;

    public Skill(int id, String name, String module, String year) {
        this.id = id;
        this.name = name;
        this.module = module;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }
}
