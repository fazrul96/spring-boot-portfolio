package com.example.demo.util.common;

import lombok.extern.slf4j.Slf4j;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.commons.io.FileUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@SuppressWarnings({"PMD.AvoidInstantiatingObjectsInLoops"})
public class OCRProcessor {
    private final List<String> ocrResults = new ArrayList<>();

    public String processImagesInDirectory(String baseDirectory, String outputDirectory)
            throws IOException, TesseractException {
        File[] files = new File(outputDirectory).listFiles();

        log.info("Starting OCR processing for files in directory: {}", outputDirectory);

        if (files != null) {
            for (File image : files) {
                if (image.isFile() && image.length() > 0) {
                    byte[] data = FileUtils.readFileToByteArray(image);
                    String fileName = image.getName();

                    log.info("Processing image: {}", fileName);

                    String outputFileName = fileName.substring(0, fileName.lastIndexOf('.')) + ".tif";
                    File outputFile = new File(outputDirectory + outputFileName);

                    FileUtils.writeByteArrayToFile(outputFile, data);

                    BufferedImage bufferedImage = ImageIO.read(image);
                    // creating an intermediary image file
                    String tempfileName = fileName.substring(0, fileName.lastIndexOf('.'));
                    String subTempDirectory = "src/test/resources/examples/png/out/";
                    ImageIO.write(bufferedImage, "png",
                            new File(subTempDirectory + tempfileName + ".png"));

                    Tesseract tesseract = new Tesseract();
                    tesseract.setDatapath("src/test/resources/tessdata");
//                tesseract.setLanguage("custom_language");
                    tesseract.setLanguage("eng");
                    tesseract.setTessVariable("tessedit_char_whitelist",
                            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
                    String text = tesseract.doOCR(outputFile);

                    log.info("OCR result for {}: {}", fileName, text);

                    ocrResults.add(text);
                }
            }
        }

        log.info("OCR processing completed for files in directory: {}", outputDirectory);

        return ocrResults.toString();
    }

    public String processImage(String baseDirectory) throws TesseractException {
        try {
            log.info("Starting OCR processing for image: {}", baseDirectory);

            long startTime = System.currentTimeMillis();
            long endTime = System.currentTimeMillis();

            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("src/test/resources/tessdata");
            tesseract.setLanguage("eng");
            tesseract.setTessVariable("tessedit_char_whitelist",
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
            //tesseract.setPageSegMode(PSM_AUTO);

            String text = tesseract.doOCR(new File(baseDirectory));
            String formattedResult = ComplexFormatter.formatAndReplaceSpecial(text);
            ocrResults.add(formattedResult);

            log.info("OCR processing completed in {} milliseconds", endTime - startTime);
            log.info("OCR processing completed for image: {}", ocrResults);
            return ocrResults.toString();
        } catch (TesseractException e) {
            log.error("Error during OCR processing: {}", e.getMessage(), e);
            throw e;
        }
    }
}