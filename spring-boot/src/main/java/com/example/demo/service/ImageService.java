package com.example.demo.service;

import com.example.demo.service.storage.MinioService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import static com.example.demo.constants.GeneralConstant.*;

@Slf4j
@Service
public class ImageService {
    private final MinioService minioService;

    @Autowired
    public ImageService(MinioService minioService) {
        this.minioService = minioService;
    }

    public List<String> downloadAndExtractImages(String title, String chapter) throws Exception {
        String formatFileName = title + DASH + "chapter" + DASH + chapter + ".zip";
        String path = WEBTOONS + SLASH + title + SLASH + formatFileName;

        InputStream zipStream = minioService.downloadZipFile(path);
        return extractImagesToBase64(zipStream);
    }

    // Extracts images from the ZIP input stream and returns a list of Base64-encoded strings
    private List<String> extractImagesToBase64(InputStream zipStream) throws IOException {
        List<String> base64Images = new ArrayList<>();
        try (ZipInputStream zipInputStream = new ZipInputStream(zipStream)) {
            ZipEntry entry;

            while ((entry = zipInputStream.getNextEntry()) != null) {
                log.info("Processing entry: {}", entry.getName());
                if (!entry.isDirectory() && isImageFile(entry.getName())) {
                    byte[] imageData = IOUtils.toByteArray(zipInputStream);
                    log.info("Extracted image: {} (Size: {} bytes)", entry.getName(), imageData.length);
                    String base64Image = encodeToBase64(imageData);
                    base64Images.add(base64Image);
                }
            }
        }
        return base64Images;
    }

    private boolean isImageFile(String fileName) {
        return fileName.toLowerCase().matches(".*\\.(jpg|jpeg|png|webp)$");
    }

    // Encodes a byte array to Base64 string
    private String encodeToBase64(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }
}