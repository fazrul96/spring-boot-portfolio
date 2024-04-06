package com.example.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "projects")
public class Project {
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
    @Column(name = "status")
    @JsonProperty("status")
    private String status;
    @Column(name = "reference")
    @JsonProperty("reference")
    private String reference;
    @Column(name = "img")
    @JsonProperty("img")
    private String img;
    @Column(name = "tag")
    @JsonProperty("tag")
    private String tag;
    @Column(name = "list")
    @JsonProperty("list")
    private String list;

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
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getList() {
        return list;
    }
    public void setList(String list) {
        this.list = list;
    }
}