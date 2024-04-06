package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "experience_items")
public class ExperienceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private Integer id;
    @Column(name = "title")
    @JsonProperty("title")
    private String title;
    @Column(name = "description")
    @JsonProperty("description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "experience_id")
    private Experience experience;
    @Column(name = "alias")
    @JsonProperty("alias")
    private String alias;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
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
    public Experience getExperience() {
        return experience;
    }
    public void setExperience(Experience experience) {
        this.experience = experience;
    }
    public String getAlias() {
        return alias;
    }
    public void setAlias(String alias) {
        this.alias = alias;
    }
}