package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.data.portfolio.entity.WebtoonChapter;
import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.data.portfolio.repository.WebtoonChapterRepository;
import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.data.portfolio.repository.WebtoonSuffixRepository;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.properties.AppProperties;
import com.example.demo.service.storage.MinioService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static com.example.demo.constants.ApiConstant.LATEST_CHAPTER_WEBTOON;
import static com.example.demo.constants.GeneralConstant.*;
import static com.example.demo.constants.ModelConstant.ASURA;

@Slf4j
@Service
public class WebtoonService {
    private final AppProperties appProperties;
    private final WebtoonRepository webtoonRepository;
    private final WebtoonChapterRepository webtoonChapterRepository;
    private final WebtoonSuffixRepository webtoonSuffixRepository;
    private final MinioService minioService;
    private final WebClient webClient;

    @Autowired
    public WebtoonService(
            AppProperties appProperties,
            WebtoonRepository webtoonRepository,
            WebtoonChapterRepository webtoonChapterRepository,
            WebtoonSuffixRepository webtoonSuffixRepository,
            MinioService minioService,
            WebClient webClient) {
        this.appProperties = appProperties;
        this.webtoonRepository = webtoonRepository;
        this.webtoonChapterRepository = webtoonChapterRepository;
        this.webtoonSuffixRepository = webtoonSuffixRepository;
        this.minioService = minioService;
        this.webClient = webClient;
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

    public void saveDefaultWebtoonChapter(WebtoonDto webtoonDto) {
        saveWebtoonChapter(webtoonDto, 1, DEFAULT);
    }

    public void saveCompletedWebtoonChapter(WebtoonDto webtoonDto, Integer chapter) {
        saveWebtoonChapter(webtoonDto, chapter, COMPLETED);
    }

    @Transactional
    public void saveWebtoonSuffix(WebtoonDto webtoonDto) {
        WebtoonSuffix webtoonSuffix = new WebtoonSuffix();
        webtoonSuffix.setTitle(webtoonDto.getTitle());
        webtoonSuffix.setSuffix(webtoonDto.getSuffix());
        webtoonSuffixRepository.save(webtoonSuffix);
        log.info("Webtoon suffix have been saved: {}", webtoonSuffix);
    }

    @Transactional
    public void deleteWebtoonByTitle(String title) {
        Optional<WebtoonSuffix> webtoonSuffixOpt = webtoonSuffixRepository.findByTitle(title);
        webtoonSuffixOpt.ifPresent(webtoonSuffixRepository::delete);

        List<WebtoonChapter> webtoonChapters = webtoonChapterRepository.findByTitle(title);
        if (!webtoonChapters.isEmpty()) {
            webtoonChapterRepository.deleteAll(webtoonChapters);
        }

        Optional<Webtoon> webtoonOpt = Optional.ofNullable(webtoonRepository.findByTitle(title));
        webtoonOpt.ifPresent(webtoonRepository::delete);
    }

    public Optional<Optional<Webtoon>> getWebtoonByTitle(String title) {
        Optional<Webtoon> webtoonOpt = Optional.ofNullable(webtoonRepository.findByTitle(title));
        Optional<WebtoonSuffix> suffixOpt = webtoonSuffixRepository.findByTitle(title);

        return Optional.of(webtoonOpt);
    }

    @Transactional
    public ResponseEntity<String> fetchLatestChapter() {
        try {
            log.debug("Calling external API to fetch latest chapter for Webtoon.");
            byte[] response = initiateFetchLatestChapter();
            log.debug("Response received: {}", new String(response));

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            String title = jsonNode.get("title").asText();
            int latestChapter = jsonNode.get("latest_chapter").asInt();

            Webtoon webtoon = webtoonRepository.findByTitle(title);
            if (webtoon == null) {
                log.error("Webtoon with title '{}' not found.", title);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Webtoon with title '" + title + "' not found");
            }

            log.debug("Updating Webtoon '{}' with latest chapter: {}", title, latestChapter);
            webtoon.setChapterCount(latestChapter);
            webtoonRepository.save(webtoon);
            webtoonRepository.flush();

            log.info("Webtoon successfully updated: {}", webtoon);
            return ResponseEntity.ok("Webtoon updated latest chapter successfully");
        } catch (Exception e) {
            log.error("Error during Webtoon update latest chapter: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }


    public byte[] initiateFetchLatestChapter() {
        log.info("Requesting webtoon fetch latest chapter");
        try {
            return webClient.post()
                    .uri(appProperties.getBaseFlaskPath() + SLASH + LATEST_CHAPTER_WEBTOON)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .bodyValue(createRequestBodyForFetchLatestChapter())
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
        } catch (Exception e) {
            log.error("Failed to fetch latest chapter for this webtoon: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch latest chapter for this webtoon", e);
        }
    }

    private byte[] initiateWebtoonDownload(String title, Integer chapter, String source, String suffix) {
        log.info("Requesting webtoon download: title={}, chapter={}, source={}", title, chapter, source);
        try {
            return webClient.post()
                    .uri(appProperties.getBaseFlaskPath() + SLASH + DOWNLOAD_WEBTOON)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .bodyValue(createRequestBody(title, chapter, source, suffix))
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
        } catch (Exception e) {
            log.error("Failed to download webtoon: {}", e.getMessage());
            throw new RuntimeException("Failed to download webtoon", e);
        }
    }

    private MultiValueMap<String, Object> createRequestBodyForFetchLatestChapter() {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("title", "nano-machine");
        return body;
    }

    private MultiValueMap<String, Object> createRequestBody(
            String title, Integer chapter, String source, String suffix) {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("title", title);
        body.add("chapter", chapter == null ? "1" : chapter.toString());
        body.add("source", source == null ? ASURA : source);
        body.add("suffix", suffix == null ? EMPTY_STRING : suffix);
        return body;
    }

    @Transactional
    public ResponseEntity<String> downloadWebtoon(String title, Integer chapter, String source, String suffix) {
        log.info("Initiating download process for Webtoon: title={}, chapter={}, source={}, suffix={}",
                title, chapter, source, suffix);

        WebtoonDto webtoonDto = webtoonRepository.findWebtoonWithMinChapter(title);
        if (webtoonDto == null) {
            throw new IllegalArgumentException("WebtoonDto is empty");
        }

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
            log.info("File uploaded to MinIO successfully: {}", uploadedFileNames);

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
            webtoon.setChapterCount(webtoonDto.getMaxChapter());
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