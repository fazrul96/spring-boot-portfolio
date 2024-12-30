package com.example.demo.util.common;

import java.util.Arrays;
import java.util.stream.Collectors;

import static com.example.demo.constants.GeneralConstant.SINGLE_SPACE;

public class StringUtils {

    /**
     * Capitalizes each word in a string, splitting by spaces, underscores, or slashes.
     */
    public static String capitalizeWords(String input) {
        return Arrays.stream(input.split("[\\s_/]+")) // Split by space, underscore, or slash
                .filter(word -> !word.isEmpty()) // Avoid empty substrings
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
                .collect(Collectors.joining(SINGLE_SPACE));
    }

    /**
     * Extracts the base name and extension from a filename.
     */
    public static String[] extractBaseNameAndExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0 && lastDotIndex < fileName.length() - 1) {
            return new String[] {
                    fileName.substring(0, lastDotIndex), // Base name
                    fileName.substring(lastDotIndex + 1) // Extension
            };
        }
        return new String[] { fileName, null }; // No extension
    }
}