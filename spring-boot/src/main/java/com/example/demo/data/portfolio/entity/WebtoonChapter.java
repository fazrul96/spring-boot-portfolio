package com.example.demo.data.portfolio.entity;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Immutable;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "webtoon_chapters")
@Immutable
public class WebtoonChapter extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @NotNull(message = "Title is required")
    @Column(name = "title")
    @JsonProperty("title")
    private String title;

    @Column(name = "chapter")
    @JsonProperty("chapter")
    private String chapter;

    @Column(name = "status")
    @JsonProperty("status")
    private String status;
}
