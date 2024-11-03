package com.example.demo.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class WebtoonDto {
    private String title;
    private String alias;
    private int chapterCount;
    private String source;
    private String suffix;

    public WebtoonDto() {
        // Default constructor
    }
}