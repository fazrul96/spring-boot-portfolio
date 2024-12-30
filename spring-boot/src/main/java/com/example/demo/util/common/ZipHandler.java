package com.example.demo.util.common;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@SuppressWarnings({"PMD.AvoidFileStream", "PMD.CollapsibleIfStatements", "PMD.UseUtilityClass",
        "PMD.PrematureDeclaration"})
public class ZipHandler {

    public static void unzipFiles(Path source, Path target) throws IOException {
        try (ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(source.toFile()))) {
            ZipEntry zipEntry = zipInputStream.getNextEntry();
            while (zipEntry != null) {
                boolean isDirectory = zipEntry.getName().endsWith(File.separator);
                Path newPath = protectAgainstZipSlip(zipEntry, target);

                log.info("Unzipping entry: {}", zipEntry.getName());

                if (isDirectory) {
                    Files.createDirectories(newPath);
                } else {
                    Path parentDir = newPath.getParent();
                    if (parentDir != null && Files.notExists(parentDir)) {
                        log.info("Creating parent directory: {}", parentDir);
                        Files.createDirectories(parentDir);
                    }
                    log.info("Copying file: {} to {}", zipEntry.getName(), newPath);
                    Files.copy(zipInputStream, newPath, StandardCopyOption.REPLACE_EXISTING);
                }
                zipEntry = zipInputStream.getNextEntry();
            }
            zipInputStream.closeEntry();
        } catch (IOException e) {
            log.error("Error during unzip process: {}", e.getMessage(), e);
            throw e; // Rethrow the exception
        }

        log.info("Unzipping completed successfully.");
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