package com.example.demo.util.common;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.commons.io.FileUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SuppressWarnings("deprecation")
public class OCRProcessor {
    private static final Logger logger = LoggerFactory.getLogger(OCRProcessor.class);

    private List<String> ocrResults = new ArrayList<>();
    private File[] files;

    public String processImagesInDirectory(String baseDirectory, String outputDirectory) throws IOException, TesseractException {
        files = new File(outputDirectory).listFiles();

        logger.info("Starting OCR processing for files in directory: {}", outputDirectory);

        for (File image : files) {
            if (image.isFile() && image.length() > 0) {
                byte[] data = FileUtils.readFileToByteArray(image);
                String fileName = image.getName();

                logger.info("Processing image: {}", fileName);

                String outputFileName = fileName.substring(0, fileName.lastIndexOf('.')) + ".tif";
                File outputFile = new File(outputDirectory + outputFileName);

                FileUtils.writeByteArrayToFile(outputFile, data);

                BufferedImage bufferedImage = ImageIO.read(image);
                // creating an intermediary image file
                String tempfileName = fileName.substring(0, fileName.lastIndexOf('.'));
                String subTempDirectory = "src/test/resources/examples/png/out/";
                ImageIO.write(bufferedImage, "png", new File(subTempDirectory + tempfileName + ".png"));

                Tesseract tesseract = new Tesseract();
                tesseract.setDatapath("src/test/resources/tessdata");
//                tesseract.setLanguage("custom_language");
                tesseract.setLanguage("eng");
                tesseract.setTessVariable("tessedit_char_whitelist", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
                String text = tesseract.doOCR(outputFile);

                logger.info("OCR result for {}: {}", fileName, text);

                ocrResults.add(text);
            }
        }
        logger.info("OCR processing completed for files in directory: {}", outputDirectory);

        return ocrResults.toString();
    }

    public String processImage(String baseDirectory) throws TesseractException {
        try {
            logger.info("Starting OCR processing for image: {}", baseDirectory);

            long startTime = System.currentTimeMillis();
            long endTime = System.currentTimeMillis();

            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("src/test/resources/tessdata");
            tesseract.setLanguage("eng");
            tesseract.setTessVariable("tessedit_char_whitelist", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
//            tesseract.setPageSegMode(PSM_AUTO);

            String text = tesseract.doOCR(new File(baseDirectory));
            String formattedResult = ComplexFormatter.formatAndReplaceSpecial(text);
            ocrResults.add(formattedResult);

            logger.info("OCR processing completed in {} milliseconds", (endTime - startTime));
            logger.info("OCR processing completed for image: {}", ocrResults);
            return ocrResults.toString();
        } catch (TesseractException e) {
            logger.error("Error during OCR processing: {}", e.getMessage(), e);
            throw e;
        }
    }
}