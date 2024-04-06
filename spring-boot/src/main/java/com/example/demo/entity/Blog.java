package com.example.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;
    @Column(name = "alias")
    @JsonProperty("alias")
    private String alias;
    @Column(name = "image")
    @JsonProperty("image")
    private String image;
    @Column(name = "title")
    @JsonProperty("title")
    private String title;
    @Column(name = "author")
    @JsonProperty("author")
    private String author;
    @Column(name = "genre")
    @JsonProperty("genre")
    private String genre;
    @Column(name = "description")
    @JsonProperty("description")
    private String description;
    @Column(name = "datetime")
    @JsonProperty("datetime")
    private String datetime;
    @Column(name = "rating")
    @JsonProperty("rating")
    private String rating;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
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
    public String getDatetime() {
        return datetime;
    }
    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
    public String getRating() {
        return rating;
    }
    public void setRating(String rating) {
        this.rating = rating;
    }
}