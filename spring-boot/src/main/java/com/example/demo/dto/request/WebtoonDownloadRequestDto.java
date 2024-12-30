package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebtoonDownloadRequestDto {
    private String title;
    private Integer chapter;
    private String source;
    private String suffix;

    public HashMap<String, Object> toMultiValueMap() {
        HashMap<String, Object> body = new HashMap<>();
        body.put("title", title);
        body.put("chapter", chapter == null ? "1" : chapter.toString());
        body.put("source", source == null ? "ASURA" : source);
        body.put("suffix", suffix == null ? "" : suffix);
        return body;
    }
}
