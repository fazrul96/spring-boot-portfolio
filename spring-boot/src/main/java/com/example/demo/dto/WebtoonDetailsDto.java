package com.example.demo.dto;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WebtoonDetailsDto {
    private Long webtoonId;
    private String webtoonTitle;
    private String webtoonArtist;
    private Double webtoonRating;
    private Long chapterId;
    private String chapterTitle;
    private Integer chapterNumber;

    public WebtoonDetailsDto(Long webtoonId, String webtoonTitle, String webtoonArtist, Double webtoonRating,
                             Long chapterId, String chapterTitle, Integer chapterNumber) {
        this.webtoonId = webtoonId;
        this.webtoonTitle = webtoonTitle;
        this.webtoonArtist = webtoonArtist;
        this.webtoonRating = webtoonRating;
        this.chapterId = chapterId;
        this.chapterTitle = chapterTitle;
        this.chapterNumber = chapterNumber;
    }
}