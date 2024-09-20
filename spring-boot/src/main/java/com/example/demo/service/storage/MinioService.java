package com.example.demo.service.storage;

import com.example.demo.config.MinioConfig;
import io.minio.*;
import io.minio.errors.*;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MinioService {
    @Autowired
    private MinioConfig minioConfig;

    @Autowired
    private MinioClient minioClient;

    public MinioService(MinioConfig minioConfig, MinioClient minioClient) {
        this.minioConfig = minioConfig;
        this.minioClient = minioClient;
    }

    public List<String> uploadFiles(List<MultipartFile> files) throws IOException, MinioException, NoSuchAlgorithmException, InvalidKeyException {
        if (files.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        List<String> uploadedFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String newFileName = generateFileName(file);
                String fileName = file.getOriginalFilename();
                String fileExtension = FilenameUtils.getExtension(fileName);

                String contentType = file.getContentType();

                try (InputStream inputStream = file.getInputStream()) {
                    minioClient.putObject(
                            PutObjectArgs.builder()
                                    .bucket(minioConfig.getBucketName())
                                    .object(newFileName)
                                    .contentType(contentType)
                                    .stream(inputStream, file.getSize(), -1)
                                    .build());
                    uploadedFileNames.add(newFileName);
                } catch (IOException | MinioException e) {
                    e.printStackTrace();
                }
            }
        }
        return uploadedFileNames;
    }

    public void deleteFile(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(minioConfig.getBucketName())
                        .object(fileName)
                        .build());
    }

    public String getFileInfo(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioClient.statObject(
                StatObjectArgs.builder()
                        .bucket(minioConfig.getBucketName())
                        .object(fileName)
                        .build()).toString();
    }

    public void downloadFile(String fileName, HttpServletResponse response) throws Exception {
        try {
            InputStream fileInputStream =  minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(minioConfig.getBucketName())
                            .object("1712021667152-Screenshot 2024-03-05 145612.png")
                            .build());

            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            response.setContentType("application/force-download");
            response.setCharacterEncoding("UTF-8");
            IOUtils.copy(fileInputStream, response.getOutputStream());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    private String generateFileName(MultipartFile file) {
        return System.currentTimeMillis() + "-" + file.getOriginalFilename();
    }
}