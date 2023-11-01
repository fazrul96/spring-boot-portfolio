package com.example.demo;

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

                String text = tesseract.doOCR(outputFile);

                logger.info("OCR result for {}: {}", fileName, text);

                ocrResults.add(text);
            }
        }
        logger.info("OCR processing completed for files in directory: {}", outputDirectory);

        return ocrResults.toString();
    }
}