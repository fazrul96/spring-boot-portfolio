package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Blog {
    private int id;

    @JsonProperty("alias")
    private String alias;

    @JsonProperty("image")
    private String image;

    @JsonProperty("title")
    private String title;

    @JsonProperty("author")
    private String author;

    @JsonProperty("genre")
    private String genre;

    @JsonProperty("description")
    private String description;

    @JsonProperty("timeAgo")
    private String timeAgo;

    public Blog(String alias, String image, String title, String author, String genre, String description, String timeAgo) {
        this.id = id;
        this.alias = alias;
        this.image = image;
        this.author = author;
        this.genre = genre;
        this.description = description;
        this.title = title;
        this.timeAgo = timeAgo;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTimeAgo() {
        return timeAgo;
    }

    public void setTimeAgo(String timeAgo) {
        this.timeAgo = timeAgo;
    }
}