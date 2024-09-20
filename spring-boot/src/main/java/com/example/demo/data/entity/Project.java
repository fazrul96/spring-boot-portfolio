package com.example.demo.data.entity;

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
@Immutable
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "title")
    @JsonProperty("title")
    private String title;

    @Column(name = "description")
    @JsonProperty("description")
    private String description;

    @Column(name = "status")
    @JsonProperty("status")
    private String status;

    @Column(name = "reference")
    @JsonProperty("reference")
    private String reference;

    @Column(name = "img")
    @JsonProperty("img")
    private String img;

    @Column(name = "tag")
    @JsonProperty("tag")
    private String tag;

    @Column(name = "list")
    @JsonProperty("list")
    private String list;
}