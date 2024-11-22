package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.data.portfolio.repository.WebtoonSuffixRepository;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.properties.AppProperties;
import com.example.demo.service.storage.MinioService;
import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.demo.constants.ApiConstant.DOWNLOAD_WEBTOON;
import static com.example.demo.constants.GeneralConstant.*;
import static com.example.demo.constants.ModelConstant.HIVETOON;

@Slf4j
@Service
public class WebtoonService {
    private final AppProperties appProperties;
    private final WebtoonRepository webtoonRepository;
    private final WebtoonSuffixRepository webtoonSuffixRepository;
    private final MinioService minioService;
    private final WebClient webClient;

    @Autowired
    public WebtoonService(
            AppProperties appProperties, WebtoonRepository webtoonRepository,
            WebtoonSuffixRepository webtoonSuffixRepository,
            MinioService minioService,
            WebClient webClient) {
        this.appProperties = appProperties;
        this.webtoonRepository = webtoonRepository;
        this.webtoonSuffixRepository = webtoonSuffixRepository;
        this.minioService = minioService;
        this.webClient = webClient;
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

    private byte[] initiateWebtoonDownload(String title, String chapter, String source, String suffix) {

        return webClient.post()
            .uri(appProperties.getBaseFlaskPath() + SLASH + DOWNLOAD_WEBTOON)
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue(createRequestBody(title, chapter, source, suffix))
            .retrieve()
            .bodyToMono(byte[].class)
            .block();
    }

    private MultiValueMap<String, Object> createRequestBody(
            String title, String chapter, String source, String suffix) {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("title", title);
        body.add("chapter", chapter.isEmpty() ? "1" : chapter);
        body.add("source", source.isEmpty() ? HIVETOON : source);
        body.add("suffix", suffix.isEmpty() ? EMPTY_STRING : suffix);
        return body;
    }

    public ResponseEntity<String> downloadWebtoon(String title, String chapter, String source, String suffix) {
        try {
            // Step 1: Initiate download from external source
            byte[] zipData = initiateWebtoonDownload(title, chapter, source, suffix);
            if (zipData == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: Unable to download file");
            }

            // Step 2: Convert byte[] to MultipartFile
            String originalFilename = title + CHAPTER_SEPARATOR + chapter + DOT + ZIP_EXTENSION;
            MultipartFile multipartFile = new MockMultipartFile(
                    TYPE_FILE,
                    originalFilename,
                    ZIP_CONTENT_TYPE,
                    new ByteArrayInputStream(zipData)
            );
            // Step 3: Upload to MinIO
            List<MultipartFile> files = new ArrayList<>();
            files.add(multipartFile);
            List<String> uploadedFileNames = minioService.uploadFiles(files, title);

            log.info("File uploaded to MinIO: {}", uploadedFileNames);

            return ResponseEntity.ok("Download completed and uploaded to MinIO successfully: " + uploadedFileNames);

        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException | MinioException e) {
            log.error("Error during file upload to MinIO", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading to MinIO: " + e.getMessage());
        } catch (Exception e) {
            log.error("Error during webtoon download", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
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