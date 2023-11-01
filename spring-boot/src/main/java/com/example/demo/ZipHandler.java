package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ZipHandler {
    private static final Logger logger = LoggerFactory.getLogger(ZipHandler.class);
    public static void unzipFiles(Path source, Path target) throws IOException {
        try (ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(source.toFile()))) {
            ZipEntry zipEntry = zipInputStream.getNextEntry();
            while (zipEntry != null) {
                boolean isDirectory = zipEntry.getName().endsWith(File.separator);
                Path newPath = protectAgainstZipSlip(zipEntry, target);

                logger.info("Unzipping entry: {}", zipEntry.getName());

                if (isDirectory) {
                    Files.createDirectories(newPath);
                } else {
                    if (newPath.getParent() != null) {
                        if (Files.notExists(newPath.getParent())) {
                            logger.info("Creating parent directory: {}", newPath.getParent());

                            Files.createDirectories(newPath.getParent());
                        }
                    }
                    logger.info("Copying file: {} to {}", zipEntry.getName(), newPath);

                    Files.copy(zipInputStream, newPath, StandardCopyOption.REPLACE_EXISTING);
                }
                zipEntry = zipInputStream.getNextEntry();
            }
            zipInputStream.closeEntry();
        } catch (IOException e) {
            logger.error("Error during unzip process: {}", e.getMessage(), e);
            throw e; // Rethrow the exception
        }

        logger.info("Unzipping completed successfully.");
    }

    private static Path protectAgainstZipSlip(ZipEntry zipEntry, Path targetDir) throws IOException {
        Path targetDirResolved = targetDir.resolve(zipEntry.getName());
        Path normalizedPath = targetDirResolved.normalize();
        if (!normalizedPath.startsWith(targetDir)) {
            throw new IOException("Malicious zip entry: " + zipEntry.getName());
        }
        return normalizedPath;
    }
}