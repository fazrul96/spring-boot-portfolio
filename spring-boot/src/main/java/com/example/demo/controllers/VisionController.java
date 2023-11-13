package com.example.demo.controllers;

//import com.google.cloud.vision.v1.Feature;
//import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
//
//import com.google.cloud.vision.v1.AnnotateImageResponse;
//import com.google.cloud.vision.v1.Feature.Type;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//import io.swagger.v3.oas.annotations.responses.ApiResponses;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.ResourceLoader;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.io.IOException;
//import java.util.Map;
//import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "${app.apiPath}")
//public class VisionController {
//    @Autowired
//    private ResourceLoader resourceLoader;
//    @Autowired
//    private CloudVisionTemplate cloudVisionTemplate;

//    @RequestMapping("/getLabelDetection")
//    public String getLabelDetection() {
//        String imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/290px-Lion_d%27Afrique.jpg";
//        Resource imageResource = this.resourceLoader.getResource(imageUrl);
//        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(imageResource,
//                Feature.Type.LABEL_DETECTION);
//        return response.getLabelAnnotationsList().toString();
//    }

//    @GetMapping("/extractLabels")
//    public ModelAndView extractLabels(String imageUrl, ModelMap map) {
//        // [START vision_spring_image_labelling]
//        AnnotateImageResponse response =
//                this.cloudVisionTemplate.analyzeImage(
//                        this.resourceLoader.getResource(imageUrl), Type.LABEL_DETECTION);
//
//        Map<String, Float> imageLabels =
//                response.getLabelAnnotationsList().stream()
//                        .collect(
//                                Collectors.toMap(
//                                        EntityAnnotation::getDescription,
//                                        EntityAnnotation::getScore,
//                                        (u, v) -> {
//                                            throw new IllegalStateException(String.format("Duplicate key %s", u));
//                                        },
//                                        LinkedHashMap::new));
//
//        map.addAttribute("annotations", imageLabels);
//        map.addAttribute("imageUrl", imageUrl);
//
//        return new ModelAndView("result", map);
//    }

//    @GetMapping("/extractText")
//    public String extractText(String imageUrl) {
//        // [START vision_spring_text_extraction]
//        String textFromImage =
//                this.cloudVisionTemplate.extractTextFromImage(this.resourceLoader.getResource(imageUrl));
//        return "Text from image: " + textFromImage;
//        // [END vision_spring_text_extraction]
//    }
//}
