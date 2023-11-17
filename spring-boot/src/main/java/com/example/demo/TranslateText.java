//package com.example.demo;

//import com.google.cloud.translate.Translate;
//import com.google.cloud.translate.TranslateOptions;
//import com.google.cloud.translate.Translate.TranslateOption;
//import com.google.cloud.translate.Translation;
//import com.google.cloud.translate.TranslationServiceClient;
//import com.google.cloud.translate.v3.TranslateTextRequest;
//import com.google.cloud.translate.v3.TranslateTextResponse;
//
//import static java.awt.SystemColor.text;
//import static jdk.javadoc.internal.doclets.toolkit.util.DocPath.parent;

//public class TranslateText {
//    String targetLanguage = "en";
//    TranslateTextRequest request =
//            TranslateTextRequest.newBuilder()
//                    .setParent(parent.toString())
//                    .setMimeType("text/plain")
//                    .setTargetLanguageCode(targetLanguage)
//                    .addContents(text)
//                    .build();
//    TranslateTextResponse response = client.translateText(request);
//    // Display the translation for each input text provided
//     for (Translation translation : response.getTranslationsList()) {
//        res = res + " ::: " + translation.getTranslatedText();
//        System.out.printf("Translated text : %s\n", res);
//    }
//}