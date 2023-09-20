package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Certification {
    private int id;

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

    public Certification(int id, String title, String name, String issued_date, String cred_id, String reference,
            String logo) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.issued_date = issued_date;
        this.cred_id = cred_id;
        this.reference = reference;
        this.logo = logo;
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