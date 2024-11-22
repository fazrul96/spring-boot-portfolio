package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.dto.WebtoonDetailsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, String> {
    Webtoon findByTitle(String title);

//    @Query("""
//        SELECT new com.example.dto.WebtoonDetailsDto(
//            webtoon.id,
//            webtoon.title,
//            webtoon.artist,
//            webtoon.rating,
//            webtoonChapter.id,
//            webtoonChapter.title,
//            webtoonChapter.chapter
//        )
//        FROM Webtoon webtoon
//        LEFT JOIN WebtoonChapter webtoonChapter ON webtoonChapter.title = webtoon.title
//        LEFT JOIN WebtoonSuffix webtoonSuffix ON webtoonSuffix.title = webtoon.title
//        """)
//    List<WebtoonDetailsDto> findWebtoonDetailsWithChapters();
}
