package com.example.demo.data.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Immutable
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