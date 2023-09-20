package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Education {
    private int id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("module")
    private String module;

    @JsonProperty("year")
    private String year;

    public Education(int id, String name, String module, String year) {
        this.id = id;
        this.name = name;
        this.module = module;
        this.year = year;
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
