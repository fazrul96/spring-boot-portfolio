package com.example.demo.util;

import com.example.demo.properties.BatchProperties;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import static com.example.demo.constants.BatchConstant.*;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BatchUtil {

    public static String retrieveOutputFileFullPath(BatchProperties batchProperties,
                                                    LocalDate date, int counter, String batchName) throws IOException {
        String outputFileBaseName = switch (batchName) {
            case PORTFOLIO -> batchProperties.getOutputFileBaseName();
            default -> null;
        };

        String finalPath = batchProperties.getOutputFilePath()
                + outputFileBaseName
                + date.format(DateTimeFormatter.ofPattern("ddMMyyyy"))
                + "_"
                + String.format("%02d", counter)
                + batchProperties.getOutputFilePath();

        if (counter == 1 && new File(finalPath).getParentFile().mkdirs()) {
            log.debug("Directories created successfully");
        }
        return finalPath;
    }

    public static LocalDate retrieveDate(int subDate) {
        ZoneId gmtPlus8 = ZoneId.of("GMT-8");
        ZonedDateTime now = ZonedDateTime.now(gmtPlus8);
        LocalDateTime currentDateTime = now.toLocalDateTime();
        return currentDateTime.toLocalDate().minusDays(subDate);
    }

    public static String formatSeq(int number) {
        return String.format("%015d", number);
    }
}
