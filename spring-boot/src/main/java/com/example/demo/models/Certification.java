package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private String id;
    
    @JsonProperty("title")
    private String title;

    @JsonProperty("name")
    private String name;

    @JsonProperty("issued_date")
    private String issued_date;

    @JsonProperty("cred_id")
    private String cred_id;

    @JsonProperty("reference")
    private String reference;
    
    @JsonProperty("logo")
    private String logo;

    public Certification() {
        // Default constructor
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
        return issued_date;
    }

    public void setIssuedDate(String issued_date) {
        this.issued_date = issued_date;
    }

    public String getCredId() {
        return cred_id;
    }

    public void setCredId(String cred_id) {
        this.cred_id = cred_id;
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