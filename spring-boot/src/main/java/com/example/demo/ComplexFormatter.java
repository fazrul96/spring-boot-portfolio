package com.example.demo;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ComplexFormatter {

    private static final Map<String, String> REPLACEMENT_RULES = new HashMap<>();

    static {
        // Add your custom replacement rules here, enhance more of this part and make it more complex
        REPLACEMENT_RULES.put("\\[\\s*", "");       // Replace "[" with an empty string
        REPLACEMENT_RULES.put("\\]", "");           // Replace "]" with an empty string
        REPLACEMENT_RULES.put("8", "&");            // Replace "8" with "&"
//        REPLACEMENT_RULES.put("2", "?");            // Replace "2" with "?"
//        REPLACEMENT_RULES.put("\\b8\\b", "&");      // Replace "8" when it's a whole word
//        REPLACEMENT_RULES.put("\\b2\\b", "?");      // Replace "2" when it's a whole word
        REPLACEMENT_RULES.put("(?i)days", " days"); // Add space before "days"
    }

    public static String formatAndReplaceSpecial(String input) {
        String formattedString = input;

        for (Map.Entry<String, String> entry : REPLACEMENT_RULES.entrySet()) {
            String pattern = entry.getKey();
            String replacement = entry.getValue();
            formattedString = formattedString.replaceAll(pattern, replacement);
        }

        // Add spacing to CamelCase
        formattedString = addSpacingToCamelCase(formattedString);

        return formattedString;
    }

    private static String addSpacingToCamelCase(String input) {
        String regex = String.format(
                "%s|%s|%s",
                "(?<=[A-Z])(?=[A-Z][a-z])",
                "(?<=[^A-Z])(?=[A-Z])",
                "(?<=[A-Za-z])(?=[^A-Za-z])"
        );

        return input.replaceAll(regex, " ");
    }

    public static void main(String[] args) {
        String input = " [Scheduleof Benefits \n" +
                "\n" +
                " Covered Dental Services\n" +
                " Hospital Room 8 Board Benefit   As Charged\n" +
                " Hospital Supplies 8 Services Benefit  s Charged\n" +
                " Normal Devery   RM 5000\n" +
                " Caesarean Secion   RM 7000\n" +
                " Abdominal Operation  s Charged\n" +
                "\n" +
                " RM 2500\n" +
                " Abortion Silith  s Charged\n" +
                " Postnatal Antenatal Benefit  s Charged\n" +
                "\n" +
                " Maximum  daysof Postnatal Care Coverageafter Delvery  15 days\n" +
                "\n" +
                "]";
        String result = formatAndReplaceSpecial(input);
        System.out.println(result);
    }
}