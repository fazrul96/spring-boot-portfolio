package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.data.portfolio.entity.WebtoonChapter;
import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.data.portfolio.repository.WebtoonChapterRepository;
import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.data.portfolio.repository.WebtoonSuffixRepository;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.properties.AppProperties;
import com.example.demo.service.auth.AuthWebClient;
import com.example.demo.service.storage.MinioService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.constants.ApiConstant.DOWNLOAD_WEBTOON;
import static com.example.demo.constants.ApiConstant.LATEST_CHAPTER_WEBTOON;
import static com.example.demo.constants.GeneralConstant.*;
import static com.example.demo.util.RequestBodyUtil.createRequestBodyForFetchLatestChapter;
import static com.example.demo.util.RequestBodyUtil.createRequestBodyForWebtoon;

@Slf4j
@Service
public class WebtoonService {
    private final AppProperties appProperties;
    private final WebtoonRepository webtoonRepository;
    private final WebtoonChapterRepository webtoonChapterRepository;
    private final WebtoonSuffixRepository webtoonSuffixRepository;
    private final MinioService minioService;
    private final AuthWebClient authWebClient;

    @Autowired
    public WebtoonService(
            AppProperties appProperties,
            WebtoonRepository webtoonRepository,
            WebtoonChapterRepository webtoonChapterRepository,
            WebtoonSuffixRepository webtoonSuffixRepository,
            MinioService minioService, AuthWebClient authWebClient) {
        this.appProperties = appProperties;
        this.webtoonRepository = webtoonRepository;
        this.webtoonChapterRepository = webtoonChapterRepository;
        this.webtoonSuffixRepository = webtoonSuffixRepository;
        this.minioService = minioService;
        this.authWebClient = authWebClient;
    }

    public List<Webtoon> getAllWebtoons() {
        return webtoonRepository.findAll();
    }

    public void createWebtoon(WebtoonDto webtoonDto) {
        saveWebtoon(webtoonDto);
        saveDefaultWebtoonChapter(webtoonDto);
        saveWebtoonSuffix(webtoonDto);
    }

    @Transactional
    public void saveWebtoon(WebtoonDto webtoonDto) {
        Webtoon webtoon = new Webtoon();
        webtoon.setTitle(webtoonDto.getTitle());
        webtoon.setAlias(webtoonDto.getAlias());
        webtoon.setChapterCount(webtoonDto.getMaxChapter());
        webtoon.setSource(webtoonDto.getSource());
        webtoonRepository.save(webtoon);
        log.info("Webtoon have been saved: {}", webtoon);
    }

    @Transactional
    public void saveWebtoonChapter(WebtoonDto webtoonDto, Integer chapter, String status) {
        WebtoonChapter webtoonChapter = new WebtoonChapter();
        webtoonChapter.setTitle(webtoonDto.getTitle());
        webtoonChapter.setChapter(chapter);
        webtoonChapter.setStatus(status);
        webtoonChapterRepository.save(webtoonChapter);
        log.info("Webtoon chapter saved: {}", webtoonChapter);
    }

    @Transactional
    public void saveWebtoonSuffix(WebtoonDto webtoonDto) {
        WebtoonSuffix webtoonSuffix = new WebtoonSuffix();
        webtoonSuffix.setTitle(webtoonDto.getTitle());
        webtoonSuffix.setSuffix(webtoonDto.getSuffix());
        webtoonSuffixRepository.save(webtoonSuffix);
        log.info("Webtoon suffix have been saved: {}", webtoonSuffix);
    }

    public void saveDefaultWebtoonChapter(WebtoonDto webtoonDto) {
        saveWebtoonChapter(webtoonDto, 1, DEFAULT);
    }

    public void saveCompletedWebtoonChapter(WebtoonDto webtoonDto, Integer chapter) {
        saveWebtoonChapter(webtoonDto, chapter, COMPLETED);
    }

    @Transactional
    public void deleteWebtoonByTitle(String title) {
        WebtoonSuffix webtoonSuffix = webtoonSuffixRepository.findByTitle(title);
        if (webtoonSuffix != null) {
            webtoonSuffixRepository.delete(webtoonSuffix);
        }

        List<WebtoonChapter> webtoonChapters = webtoonChapterRepository.findByTitle(title);
        if (!webtoonChapters.isEmpty()) {
            webtoonChapterRepository.deleteAll(webtoonChapters);
        }

        Webtoon webtoon = webtoonRepository.findByTitle(title);
        if (webtoon != null) {
            webtoonRepository.delete(webtoon);
        }
    }

    public Webtoon getWebtoonByTitle(String title) {
        Webtoon webtoon = webtoonRepository.findByTitle(title);
        if (webtoon == null) {
            throw new IllegalArgumentException("Webtoon is empty");
        }
        return webtoon;
    }

    @Transactional
    public ResponseEntity<String> fetchLatestChapter(String title) {
        try {
            Webtoon webtoon = webtoonRepository.findByTitle(title);
            if (webtoon == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Webtoon not found");
            }

            WebtoonSuffix webtoonSuffix = webtoonSuffixRepository.findByTitle(title);
            if (webtoonSuffix == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Webtoon suffix not found");
            }

            byte[] response = initiateFetchLatestChapter(webtoon.getTitle(), webtoonSuffix.getSuffix());
            log.info("Response received: {}", new String(response));

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            int latestChapter = jsonNode.get("latest_chapter").asInt();

            updateWebtoonChapter(webtoon, latestChapter);
            return ResponseEntity.ok("Webtoon updated latest chapter successfully");
        } catch (Exception e) {
            log.error("Error during Webtoon update latest chapter: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @Transactional
    public void updateWebtoonChapter(Webtoon webtoon, int latestChapter) {
        log.info("Updating Webtoon '{}' with latest chapter: {}", webtoon.getTitle(), latestChapter);
        webtoon.setChapterCount(latestChapter);
        webtoonRepository.saveAndFlush(webtoon);
    }

    public byte[] initiateFetchLatestChapter(String title, String suffix) {
        String endpoint = appProperties.getBaseFlaskPath() + SLASH + LATEST_CHAPTER_WEBTOON;
        MultiValueMap<String, Object> requestBody = createRequestBodyForFetchLatestChapter(title, suffix);
        return authWebClient.initiateWebtoonRequest(endpoint, requestBody);
    }

    private byte[] initiateWebtoonDownload(String title, Integer chapter, String source, String suffix) {
        String endpoint = appProperties.getBaseFlaskPath() + SLASH + DOWNLOAD_WEBTOON;
        MultiValueMap<String, Object> requestBody = createRequestBodyForWebtoon(title, chapter, source, suffix);
        return authWebClient.initiateWebtoonRequest(endpoint, requestBody);
    }

    @Transactional
    public ResponseEntity<String> downloadWebtoon(String title, Integer chapter, String source, String suffix) {
        log.info("Initiating download process for Webtoon: title={}, chapter={}, source={}, suffix={}",
                title, chapter, source, suffix);

        WebtoonDto webtoonDto = webtoonRepository.findWebtoonWithMinChapter(title);
        if (webtoonDto == null) {
            throw new IllegalArgumentException("WebtoonDto is empty");
        }

        // todo temporary solution, get suffix from db, later only param title the rest can get from db
        WebtoonSuffix webtoonSuffix = webtoonSuffixRepository.findByTitle(title);
        if (webtoonSuffix == null) {
            throw new IllegalArgumentException("Webtoon suffix is empty");
        }
        suffix = webtoonSuffix.getSuffix();

        try {
            log.debug("Calling external API to download Webtoon data.");
            byte[] zipData = initiateWebtoonDownload(title, chapter, source, suffix);

            if (zipData == null) {
                log.warn("No data received for title={}, chapter={}, source={}", title, chapter, source);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: Unable to download file");
            }
            log.info("Webtoon data downloaded successfully for title={}, chapter={}", title, chapter);

            MultipartFile multipartFile = convertToMultipartFile(webtoonDto, chapter, zipData);

            log.info("Uploading Webtoon to MinIO: title={}, chapter={}", title, chapter);
            List<MultipartFile> files = new ArrayList<>();
            files.add(multipartFile);
            List<String> uploadedFileNames = minioService.uploadFiles(files, title);
            log.info("File ad completed and uploaded to MinIO successlly: {}", uploadedFileNames);

            saveCompletedWebtoonChapter(webtoonDto, chapter);
            return ResponseEntity.ok("Download completed and uploaded to MinIO successfully: " + uploadedFileNames);

        } catch (NoSuchAlgorithmException | InvalidKeyException | MinioException e) {
            log.error("File upload to MinIO failed: title={}, chapter={}, reason={}",
                    title, chapter, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading to MinIO: " + e.getMessage());
        } catch (Exception e) {
            log.error("Error during downloadWebtoon: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    public MultipartFile convertToMultipartFile(WebtoonDto webtoonDto, Integer chapter, byte[] data) {
        try {
            String title = webtoonDto.getTitle();
            String originalFilename = title
                    + CHAPTER_SEPARATOR
                    + chapter.toString()
                    + DOT
                    + ZIP_EXTENSION;
            return new MockMultipartFile(
                    TYPE_FILE,
                    originalFilename,
                    ZIP_CONTENT_TYPE,
                    new ByteArrayInputStream(data));
        } catch (IOException e) {
            log.error("Failed to convert data to MultipartFile: {}", e.getMessage());
            throw new RuntimeException("File conversion failed", e);
        }
    }

    // todo not working
    @Transactional
    public ResponseEntity<String> updateWebtoon(String title, WebtoonDto webtoonDto) {
        Webtoon webtoon = webtoonRepository.findByTitle(title);
        if (webtoon != null) {
            webtoonRepository.delete(webtoon);
        }

        WebtoonSuffix webtoonSuffix = webtoonSuffixRepository.findByTitle(title);
        if (webtoonSuffix != null) {
            webtoonSuffixRepository.delete(webtoonSuffix);
        }

        List<WebtoonChapter> webtoonChapters = webtoonChapterRepository.findByTitle(title);
        if (!webtoonChapters.isEmpty()) {
            webtoonChapterRepository.deleteAll(webtoonChapters);
        }

        // Check if both entities are present
        if (webtoon != null && webtoonSuffix != null) {
            // Update fields in Webtoon
            webtoon.setTitle(webtoonDto.getTitle());
            webtoon.setAlias(webtoonDto.getAlias());
            webtoon.setChapterCount(webtoonDto.getMaxChapter());
            webtoon.setSource(webtoonDto.getSource());

            // Update fields in WebtoonSuffix
            webtoonSuffix.setSuffix(webtoonDto.getSuffix());

            webtoonRepository.saveAndFlush(webtoon);
            webtoonSuffixRepository.saveAndFlush(webtoonSuffix);

            return ResponseEntity.ok("Successfully update webtoon and webtoon suffix");
        } else {
            throw new IllegalArgumentException("Webtoon or Webtoon suffix connot be null");
        }
    }
}