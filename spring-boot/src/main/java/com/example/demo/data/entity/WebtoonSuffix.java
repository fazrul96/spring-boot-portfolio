package com.example.demo.data.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Immutable;

@Data
@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "webtoon_suffixes")
@Immutable
public class WebtoonSuffix {
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
