package com.example.demo.data.portfolio.entity;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import static com.example.demo.constants.ModelConstant.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = TBL_WEBTOON_CHAPTER)
public class WebtoonChapter extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ID)
    @JsonProperty("id")
    private Long id;

    @NotNull(message = "Title is required")
    @Column(name = TITLE)
    @JsonProperty("title")
    private String title;

    @Column(name = CHAPTER)
    @JsonProperty("chapter")
    private Integer chapter;

    @Column(name = STATUS)
    @JsonProperty("status")
    private String status;
}
