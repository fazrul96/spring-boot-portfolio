package com.example.demo.service;

import com.example.demo.service.storage.MinioService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.*;
import java.util.*;
import java.util.zip.*;

@Service
public class ImageService {

    @Autowired
    private MinioService minioService;

    // This method will handle the image extraction logic
    public List<String> downloadAndExtractImages(String title, String chapter) throws Exception {
        // Step 1: Construct the file name based on the title and chapter
        String fileName = title + "_" + chapter + ".zip";

        // Step 2: Download the zip file from MinIO
        InputStream zipStream = minioService.downloadZipFile(fileName);

        // Step 3: Extract the zip file content
        List<String> imageUrls = extractImages(zipStream);

        // Step 4: Return the list of extracted image URLs
        return imageUrls;
    }

    // Helper method to extract images from the ZIP input stream
    private List<String> extractImages(InputStream zipStream) throws IOException {
        List<String> imageUrls = new ArrayList<>();
        try (ZipInputStream zipInputStream = new ZipInputStream(zipStream)) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                if (entry.isDirectory()) {
                    continue;
                }

                // Here you can use a temporary file or in-memory solution like a ByteArrayOutputStream
                // For now, let's assume the images are stored locally or returned as URLs
                // For simplicity, I'm adding image names here, but you can process the image data as needed
                if (entry.getName().endsWith(".jpg") || entry.getName().endsWith(".png")) {
                    // Extract the image and add the image URL (or in-memory data) to the list
                    byte[] imageData = IOUtils.toByteArray(zipInputStream);
                    String imageUrl = storeImageAndGetUrl(imageData, entry.getName());
                    imageUrls.add(imageUrl);
                }
            }
        }
        return imageUrls;
    }

    // Helper method to simulate storing the image and returning a URL (or path)
    private String storeImageAndGetUrl(byte[] imageData, String fileName) throws IOException {
        // This could be storing the image in a static directory, cloud storage, or returning a base64-encoded string
        // For now, let's simulate the process by saving the image locally
        String filePath = "images/" + fileName;
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(imageData);
        }
        return filePath; // You could return a URL or base64 string here as needed
    }
}