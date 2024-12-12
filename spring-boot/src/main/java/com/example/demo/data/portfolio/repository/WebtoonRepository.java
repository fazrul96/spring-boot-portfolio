package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.dto.WebtoonDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, String> {
    Webtoon findByTitle(String title);

    @Query("""
    SELECT new com.example.demo.dto.WebtoonDto(
        webtoon.title,
        webtoon.alias,
        webtoon.source,
        webtoon.chapterCount,
        webtoonChapter.chapter,
        webtoonSuffix.suffix
    )
    FROM Webtoon webtoon
    LEFT JOIN WebtoonChapter webtoonChapter ON webtoonChapter.title = webtoon.title
    LEFT JOIN WebtoonSuffix webtoonSuffix ON webtoonSuffix.title = webtoon.title
    WHERE webtoonChapter.chapter = (
            SELECT MIN(wc.chapter)
            FROM WebtoonChapter wc
            WHERE wc.title = webtoon.title)
    AND webtoon.title = :title AND webtoonChapter.status = 'DEFAULT'
    """)
    WebtoonDto findWebtoonWithMinChapter(
        @Param("title") String title);
}