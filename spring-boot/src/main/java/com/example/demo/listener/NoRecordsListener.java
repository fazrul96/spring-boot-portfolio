package com.example.demo.listener;

import com.example.demo.util.BatchUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ChunkListener;
import org.springframework.batch.core.scope.context.ChunkContext;

import com.example.demo.dto.demo.*;
import com.example.demo.properties.BatchProperties;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static com.example.demo.constants.BatchConstant.*;
import static com.example.demo.util.BatchUtil.*;

@Slf4j
public class NoRecordsListener implements ChunkListener {
    private final BatchProperties batchProperties;

    private final String layoutName;
    private LocalDate fromDate;
    private LocalDate toDate;

    public NoRecordsListener(BatchProperties batchProperties, String layoutName) {
        this.batchProperties = batchProperties;
        this.layoutName = layoutName;
    }

    public String formatHeaderContent(String layoutName) {
        return switch (layoutName) {
            case PORTFOLIO -> "  <PortfolioTable>\n  </PortfolioTable>\n<Portfolio>";
            default -> null;
        };
    }

    public String formatRootContent(String layoutName) {
        return switch (layoutName) {
            case PORTFOLIO -> "</Portfolio>";
            default -> null;
        };
    }

    @Override
    public void afterChunk(ChunkContext context) {
        if (context.getStepContext().getStepExecution().getReadCount() == 0) {
            if (!batchProperties.getFromDate().isEmpty() && !batchProperties.getToDate().isEmpty()) {
                fromDate = LocalDate.parse(batchProperties.getFromDate());
                toDate = LocalDate.parse(batchProperties.getToDate());
            } else {
                fromDate = BatchUtil.retrieveDate(1);
                toDate = fromDate;
            }
        }
        LocalDate todayDate = BatchUtil.retrieveDate(0);
        JacksonXmlModule xmlModule = new JacksonXmlModule();
        xmlModule.setDefaultUseWrapper(true);
        ObjectMapper objectMapper = new XmlMapper(xmlModule);

        try (FileWriter fileWriter = new FileWriter(retrieveOutputFileFullPath(batchProperties,
                todayDate, 1, layoutName), StandardCharsets.UTF_8, true)) {
            fileWriter.write(retrieveHeaderContent(objectMapper, todayDate, layoutName));
            fileWriter.write(formatHeaderContent(layoutName));
        } catch (IOException e) {
            log.error("Error writing XML to file: " + e.getMessage());
        }
    }

    private String retrieveHeaderContent(ObjectMapper objectMapper, LocalDate todayDate, String layoutName)
            throws JsonProcessingException {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        HeaderDto headerDto = HeaderDto.builder()
                .code(PORTFOLIO)
                .runDate(todayDate.format(dateTimeFormatter))
                .startDate(todayDate.format(dateTimeFormatter))
                .endDate(todayDate.format(dateTimeFormatter))
                .totalRecordCount(todayDate.format(dateTimeFormatter))
                .build();
        PortfolioDto portfolioDto = PortfolioDto.builder().headerDto(headerDto).build();
        RootDto rootDto = RootDto.builder().portfolioDto(portfolioDto).build();
        String responseHeaderXml = objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(rootDto);
        return  responseHeaderXml
                .replaceAll("<RootDto>|</RootDto>","")
                .replaceAll(formatRootContent(layoutName),"")
                .replaceAll("(?m)^[ \t]*\r?\n","")
                .replaceAll("(?m)^ {2}","");
    }
}