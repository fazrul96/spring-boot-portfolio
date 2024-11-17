package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.data.portfolio.repository.WebtoonSuffixRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class WebtoonSuffixService {
    private final WebtoonSuffixRepository webtoonSuffixRepository;

    @Autowired
    public WebtoonSuffixService(WebtoonSuffixRepository webtoonSuffixRepository) {
        this.webtoonSuffixRepository = webtoonSuffixRepository;
    }

    public List<WebtoonSuffix> getAllWebtoonsSuffix() {
        return webtoonSuffixRepository.findAll();
    }

    public Optional<String> getWebtoonSuffixByTitle(String title) {
        return webtoonSuffixRepository.findByTitle(title).map(WebtoonSuffix::getSuffix);
    }
}