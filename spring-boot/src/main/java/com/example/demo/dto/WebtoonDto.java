package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WebtoonDto {
    private String title;
    private String alias;
    private String source;
    private Integer maxChapter;
    private Integer minChapter;
    private String suffix;

    public WebtoonDto(
        String title,
        String alias,
        String source,
        Integer maxChapter,
        Integer minChapter,
        String suffix
    ) {
        this.title = title;
        this.alias = alias;
        this.source = source;
        this.maxChapter = maxChapter;
        this.minChapter = minChapter;
        this.suffix = suffix;
    }
}