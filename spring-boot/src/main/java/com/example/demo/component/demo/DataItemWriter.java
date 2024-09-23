//package com.example.demo.component.demo;
//
//import com.example.demo.dto.demo.PortfolioRecordDto;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
//import com.fasterxml.jackson.dataformat.xml.XmlMapper;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.configuration.annotation.StepScope;
//import org.springframework.batch.item.Chunk;
//import org.springframework.batch.item.ItemWriter;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import com.example.demo.dto.demo.PortfolioTableDto;
//import com.example.demo.properties.BatchProperties;
//import com.example.demo.util.BatchUtil;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Objects;
//
//@Component("DataItemWriter")
//@Slf4j
//@StepScope
//public class DataItemWriter implements ItemWriter<PortfolioTableDto> {
//
//    private final BatchProperties batchProperties;
//
//    Integer fileCounter = 1;
//    Integer tempMaxRecordCounter = 0;
//    Integer seqNumber = 0;
//    Integer writerRecordCount = 0;
//    Boolean headerWritten = false;
//
//    @Value("#{jobExecutionContext['startDate']}")
//    private LocalDate startDate;
//
//    public DataItemWriter(BatchProperties batchProperties) {
//        this.batchProperties = batchProperties;
//    }
//
//    @Override
//    public void write(Chunk<? extends PortfolioTableDto> portfolioTableDto) throws IOException {
//
//    }
//}
