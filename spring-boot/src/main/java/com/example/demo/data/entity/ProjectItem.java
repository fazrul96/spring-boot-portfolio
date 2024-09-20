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
@Table(name = "project_items")
public class ProjectItem {
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

    @Column(name = "reference")
    @JsonProperty("reference")
    private String reference;
}