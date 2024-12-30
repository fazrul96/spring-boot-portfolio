package com.example.demo.data.portfolio.entity;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "webtoon_suffixes")
public class WebtoonSuffix extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @NotNull(message = "Title is required")
    @Column(name = "title")
    @JsonProperty("title")
    private String title;

    @NotNull(message = "Suffix is required")
    @Column(name = "suffix")
    @JsonProperty("suffix")
    private String suffix;
}
