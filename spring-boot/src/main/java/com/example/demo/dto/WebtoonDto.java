package com.example.demo.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WebtoonDto {
    private String title;
    private String alias;
    private int chapterCount;
    private String source;
    private String suffix;
}