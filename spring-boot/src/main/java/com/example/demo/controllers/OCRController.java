package com.example.demo.controllers;

import net.sourceforge.tess4j.Tesseract;
import org.apache.commons.io.FileUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class OCRController {
    public static List<String> results = new ArrayList<>();
    public static File[] files;
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "processOCR")
    public String processOCR() throws Exception {
        List<String>  ocrResult = Collections.singletonList(performOCR());
        return ocrResult.toString();
    }

    private String performOCR() throws Exception {
        String pathDir = "src/test/resources/examples/";
        String inputDir = pathDir + "tif/";
        String outputDir = pathDir + "tif/out/";

        files = new File(inputDir).listFiles();
        results = new ArrayList<>();

        for (File image : files) {
            if (image.isFile() && image.length() > 0) {
                byte[] data = FileUtils.readFileToByteArray(image);
                String fileName = image.getName();
                String outputFileName = fileName.substring(0, fileName.lastIndexOf('.')) + ".tif";
                File outputFile = new File(outputDir + outputFileName);

                FileUtils.writeByteArrayToFile(outputFile, data);

                BufferedImage bufferedImage = ImageIO.read(image);
                ImageIO.write(bufferedImage, "png", new File(pathDir + "out.png"));

                Tesseract tesseract = new Tesseract();
                tesseract.setDatapath("src/test/resources/tessdata");

                String text = tesseract.doOCR(outputFile);
                results.add(text);
            }
        }

        return results.toString();
    }
}