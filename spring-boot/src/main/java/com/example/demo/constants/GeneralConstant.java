package com.example.demo.constants;

import java.time.format.DateTimeFormatter;

public final class GeneralConstant {
    public static final String COLON = ":";
    public static final String SLASH = "/";
    public static final String UNDERSCORE = "_";
    public static final String DASH = "-";
    public static final String EMPTY_STRING = "";
    public static final String SINGLE_SPACE  = " ";
    public static final String DOUBLE_ASTERISKS = "**";

    public static final String WEBTOONS = "Webtoons";

    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static final String SUCCESS = "SUCCESS";
    public static final String COMPLETED = "COMPLETED";
    public static final String FAILED = "FAILED";
    public static final String INPROGRESS = "INPROGRESS";

    private GeneralConstant() {
    }
}