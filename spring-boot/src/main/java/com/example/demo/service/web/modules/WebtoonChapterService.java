package com.example.demo.service.web.modules;

import com.example.demo.data.portfolio.entity.WebtoonChapter;
import com.example.demo.data.portfolio.repository.WebtoonChapterRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WebtoonChapterService {
    private final WebtoonChapterRepository webtoonChapterRepository;

    @Autowired
    public WebtoonChapterService(WebtoonChapterRepository webtoonChapterRepository) {
        this.webtoonChapterRepository = webtoonChapterRepository;
    }

    public List<WebtoonChapter> getWebtoonChaptersByTitle(String title) {
        return webtoonChapterRepository.findByTitle(title);
    }
}