package com.example.demo.data.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog_chapters")
public class BlogChapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "episode")
    @JsonProperty("episode")
    private String episode;

    @Column(name = "image")
    @JsonProperty("image")
    private String image;

    @Column(name = "blog_id")
    @JsonProperty("blogId")
    private String blogId;
}