package com.example.demo.data.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;

@Data
@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@Table(name = "webtoons")
@Immutable
public class Webtoon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

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

    @Column(name = "rating")
    @JsonProperty("rating")
    private double rating;

    @Column(name = "artist")
    @JsonProperty("artist")
    private String artist;

    @Column(name = "chapter_count")
    @JsonProperty("chapterCount")
    private int chapterCount;

    @Column(name = "source")
    @JsonProperty("source")
    private String source;

    @Column(name = "created_date")
    @JsonProperty("createdDate")
    private String createdDate;

    @Column(name = "updated_date")
    @JsonProperty("updatedDate")
    private String updatedDate;

    @Column(name = "status")
    @JsonProperty("status")
    private String status;

    @Column(name = "type")
    @JsonProperty("type")
    private String type;

    @Column(name = "banner_image")
    @JsonProperty("bannerImage")
    private String bannerImage;

    @Column(name = "cover_image")
    @JsonProperty("coverImage")
    private String coverImage;

    public Webtoon() {
        this.chapterCount = 1;
        this.source = "asura";
    }
}