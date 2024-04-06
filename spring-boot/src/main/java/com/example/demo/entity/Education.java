package com.example.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "educations")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private Integer id;
    @Column(name = "name")
    @JsonProperty("name")
    private String name;
    @Column(name = "module")
    @JsonProperty("module")
    private String module;
    @Column(name = "year")
    @JsonProperty("year")
    private String year;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
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
