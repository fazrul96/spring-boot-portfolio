package com.example.demo.dto.demo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortfolioTableDto {
    @JacksonXmlProperty(localName = "PortfolioRecord")
    private PortfolioRecordDto portfolioRecordDto;
}
