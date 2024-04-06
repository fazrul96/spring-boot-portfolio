package com.example.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
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

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getEpisode() {
        return episode;
    }
    public void setEpisode(String episode) {
        this.episode = episode;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getBlogId() {
        return blogId;
    }
    public void setBlogId(String blogId) {
        this.blogId = blogId;
    }
}
