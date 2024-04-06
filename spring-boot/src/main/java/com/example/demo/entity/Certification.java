package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "certifications")
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private Integer id;
    @Column(name = "title")
    @JsonProperty("title")
    private String title;
    @Column(name = "name")
    @JsonProperty("name")
    private String name;
    @Column(name = "issued_date")
    @JsonProperty("issuedDate")
    private String issuedDate;
    @Column(name = "cred_id")
    @JsonProperty("credId")
    private String credId;
    @Column(name = "reference")
    @JsonProperty("reference")
    private String reference;
    @Column(name = "logo")
    @JsonProperty("logo")
    private String logo;

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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getIssuedDate() {
        return issuedDate;
    }
    public void setIssuedDate(String issuedDate) {
        this.issuedDate = issuedDate;
    }
    public String getCredId() {
        return credId;
    }
    public void setCredId(String credId) {
        this.credId = credId;
    }
    public String getReference() {
        return reference;
    }
    public void setReference(String reference) {
        this.reference = reference;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
}