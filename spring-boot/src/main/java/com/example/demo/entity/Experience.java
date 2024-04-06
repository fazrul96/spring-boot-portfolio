package com.example.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private Integer id;
    @Column(name = "company_name")
    @JsonProperty("companyName")
    private String companyName;
    @Column(name = "company_type")
    @JsonProperty("companyType")
    private String companyType;
    @Column(name = "role")
    @JsonProperty("role")
    private String role;
    @Column(name = "tag")
    @JsonProperty("tag")
    private String tag;
    @Column(name = "year")
    @JsonProperty("year")
    private String year;
    @Column(name = "startdate")
    @JsonProperty("startdate")
    private String startdate;
    @Column(name = "enddate")
    @JsonProperty("enddate")
    private String enddate;
    @Column(name = "duration")
    @JsonProperty("duration")
    private String duration;
    @Column(name = "image")
    @JsonProperty("image")
    private String image;
    @Column(name = "alias")
    @JsonProperty("alias")
    private String alias;

    @OneToMany(mappedBy = "experience")
    private List<ExperienceItem> experienceItems;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getCompanyType() {
        return companyType;
    }
    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public String getStartdate() {
        return startdate;
    }
    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }
    public String getEnddate() {
        return enddate;
    }
    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }
    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getAlias() {
        return alias;
    }
    public void setAlias(String alias) {
        this.alias = alias;
    }
}