package com.example.demo.constants;

import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@NoArgsConstructor
public final class GeneralConstant {
    public static final String COLON = ":";
    public static final String SLASH = "/";
    public static final String UNDERSCORE = "_";
    public static final String DOT = ".";
    public static final String DASH = "-";
    public static final String EMPTY_STRING = "";
    public static final String SINGLE_SPACE  = " ";
    public static final String DOUBLE_ASTERISKS = "**";

    public static final String FORWARD_SLASH_PREFIX_REGEX = "^/+";  // Matches one or more slashes at the start
    public static final String FORWARD_SLASH_SUFFIX_REGEX = "/+$";
    public static final String FORWARD_SLASH_SINGLE_SUFFIX_REGEX = "/$";
    public static final String TYPE_FOLDER = "folder";
    public static final String TYPE_FILE = "file";
    public static final String EXTENSION_KEY = "extension";
    public static final String LABEL_KEY = "label";
    public static final String ALIAS_KEY = "alias";
    public static final String TYPE_KEY = "type";
    public static final String ORIGINAL_NAME_KEY = "originalName";

    public static final String WEBTOONS = "Webtoons";

    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static final String ZIP_EXTENSION = "zip";
    public static final String ZIP_CONTENT_TYPE = "application/zip";
    public static final String JSON_CONTENT_TYPE = "application/json";
    public static final String FORCE_DOWNLOAD_CONTENT_TYPE = "application/force-download";
    public static final String OCTET_STREAM_CONTENT_TYPE = "application/octet-stream";

    public static final String CHAPTER_SEPARATOR = "-chapter-";

    public static final String DEFAULT = "DEFAULT";
    public static final String SUCCESS = "SUCCESS";
    public static final String COMPLETED = "COMPLETED";
    public static final String FAILED = "FAILED";
    public static final String PENDING = "PENDING";
    public static final String INPROGRESS = "INPROGRESS";
}