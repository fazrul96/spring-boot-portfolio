package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.data.portfolio.repository.WebtoonSuffixRepository;
import com.example.demo.dto.WebtoonDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class WebtoonService {
    private final WebtoonRepository webtoonRepository;
    private final WebtoonSuffixRepository webtoonSuffixRepository;

    @Autowired
    public WebtoonService(WebtoonRepository webtoonRepository, WebtoonSuffixRepository webtoonSuffixRepository) {
        this.webtoonRepository = webtoonRepository;
        this.webtoonSuffixRepository = webtoonSuffixRepository;
    }

    public List<Webtoon> getAllWebtoons() {
        return webtoonRepository.findAll();
    }

    @Transactional
    public void createWebtoon(WebtoonDto webtoonDto) {
        Webtoon webtoon = new Webtoon();
        webtoon.setTitle(webtoonDto.getTitle());
        webtoon.setAlias(webtoonDto.getAlias());
        webtoon.setChapterCount(webtoonDto.getChapterCount());
        webtoon.setSource(webtoonDto.getSource());

        webtoonRepository.save(webtoon);

        WebtoonSuffix webtoonSuffix = new WebtoonSuffix();
        webtoonSuffix.setTitle(webtoonDto.getTitle());
        webtoonSuffix.setSuffix(webtoonDto.getSuffix());

        webtoonSuffixRepository.save(webtoonSuffix);
    }

    @Transactional
    public void deleteWebtoonByTitle(String title) {
        Optional<WebtoonSuffix> webtoonSuffixOpt = webtoonSuffixRepository.findByTitle(title);
        webtoonSuffixOpt.ifPresent(webtoonSuffixRepository::delete);

        Optional<Webtoon> webtoonOpt = Optional.ofNullable(webtoonRepository.findByTitle(title));
        webtoonOpt.ifPresent(webtoonRepository::delete);
    }

    public Optional<WebtoonDto> getWebtoonByTitle(String title) {
        Optional<Webtoon> webtoonOpt = Optional.ofNullable(webtoonRepository.findByTitle(title));
        Optional<WebtoonSuffix> suffixOpt = webtoonSuffixRepository.findByTitle(title);

        if (webtoonOpt.isPresent() && suffixOpt.isPresent()) {
            Webtoon webtoon = webtoonOpt.get();
            WebtoonSuffix webtoonSuffix = suffixOpt.get();

            WebtoonDto webtoonDto = WebtoonDto.builder()
                    .title(webtoon.getTitle())
                    .alias(webtoon.getAlias())
                    .chapterCount(webtoon.getChapterCount())
                    .source(webtoon.getSource())
                    .suffix(webtoonSuffix.getSuffix())
                    .build();

            return Optional.of(webtoonDto);
        }
        return Optional.empty();
    }

    // todo not working
    @Transactional
    public Optional<WebtoonDto> updateWebtoon(String title, WebtoonDto webtoonDto) {
        // Retrieve Webtoon and WebtoonSuffix by title
        Optional<Webtoon> webtoonOpt = Optional.ofNullable(webtoonRepository.findByTitle(title));
        Optional<WebtoonSuffix> suffixOpt = webtoonSuffixRepository.findByTitle(title);

        // Check if both entities are present
        if (webtoonOpt.isPresent() && suffixOpt.isPresent()) {
            Webtoon webtoon = webtoonOpt.get();
            WebtoonSuffix webtoonSuffix = suffixOpt.get();

            // Update fields in Webtoon
            webtoon.setTitle(webtoonDto.getTitle());
            webtoon.setAlias(webtoonDto.getAlias());
            webtoon.setChapterCount(webtoonDto.getChapterCount());
            webtoon.setSource(webtoonDto.getSource());

            // Update fields in WebtoonSuffix
            webtoonSuffix.setSuffix(webtoonDto.getSuffix());

            webtoonRepository.save(webtoon);
            webtoonRepository.flush();
            webtoonSuffixRepository.save(webtoonSuffix);
            webtoonSuffixRepository.flush();

            return Optional.of(webtoonDto);
        } else {
            // Handle the case where either the webtoon or suffix does not exist
            return Optional.empty(); // or throw an appropriate exception
        }
    }
}