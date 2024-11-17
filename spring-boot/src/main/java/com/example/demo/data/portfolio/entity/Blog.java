package com.example.demo.data.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blogs")
@Immutable
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
}