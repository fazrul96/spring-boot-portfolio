package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FetchLatestChapterRequestDto {
    private String title;
    private String suffix;

    public Map<String, Object> toMultiValueMap() {
        HashMap<String, Object> body = new HashMap<>();
        body.put("title", title);
        body.put("suffix", suffix);
        return body;
    }
}