package com.example.demo.models;

import com.google.api.client.util.DateTime;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
@Entity
@Table(name = "blog_chapters")
public class BlogChapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonProperty("id")
    private String id;

    @JsonProperty("episode")
    private String episode;

    @JsonProperty("image")
    private String image;

    @JsonProperty("blog_id")
    private String blog_id;

    public BlogChapter() {
        // Default constructor
    }
}
