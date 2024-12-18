package com.example.demo.data.portfolio.entity;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import static com.example.demo.constants.ModelConstant.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = TBL_WEBTOONS)
@DynamicUpdate
public class Webtoon extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ID)
    @JsonProperty("id")
    private Long id;

    @Column(name = ALIAS)
    @JsonProperty("alias")
    private String alias;

    @Column(name = IMAGE)
    @JsonProperty("image")
    private String image;

    @Column(name = TITLE)
    @JsonProperty("title")
    private String title;

    @Column(name = AUTHOR)
    @JsonProperty("author")
    private String author;

    @Column(name = GENRE)
    @JsonProperty("genre")
    private String genre;

    @Column(name = DESCRIPTION)
    @JsonProperty("description")
    private String description;

    @Column(name = RATING)
    @JsonProperty("rating")
    private double rating;

    @Column(name = ARTIST)
    @JsonProperty("artist")
    private String artist;

    @Column(name = CHAPTER_COUNT)
    @JsonProperty("chapterCount")
    private int chapterCount;

    @Column(name = SOURCE)
    @JsonProperty("source")
    private String source;

    @Column(name = STATUS)
    @JsonProperty("status")
    private String status;

    @Column(name = TYPE)
    @JsonProperty("type")
    private String type;

    @Column(name = BANNER_IMAGE)
    @JsonProperty("bannerImage")
    private String bannerImage;

    @Column(name = COVER_IMAGE)
    @JsonProperty("coverImage")
    private String coverImage;
}