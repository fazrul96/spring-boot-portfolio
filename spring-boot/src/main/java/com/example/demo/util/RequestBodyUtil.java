package com.example.demo.util;

import com.example.demo.dto.request.FetchLatestChapterRequestDto;
import com.example.demo.dto.request.WebtoonDownloadRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;

@Slf4j
public class RequestBodyUtil {
    public static MultiValueMap<String, Object> createRequestBody(Map<String, Object> params) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        params.forEach(body::add);
        return body;
    }

    public static MultiValueMap<String, Object> createRequestBodyForFetchLatestChapter(String title, String suffix) {
        FetchLatestChapterRequestDto request = new FetchLatestChapterRequestDto(title, suffix);
        return createRequestBody(request.toMultiValueMap());
    }

    public static MultiValueMap<String, Object> createRequestBodyForWebtoon(
            String title, Integer chapter, String source, String suffix) {
        WebtoonDownloadRequestDto request = new WebtoonDownloadRequestDto(title, chapter, source, suffix);
        return createRequestBody(request.toMultiValueMap());
    }
}