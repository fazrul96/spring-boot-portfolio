package com.example.demo.dto.demo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JacksonXmlRootElement(localName = "PortfolioRecord")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortfolioRecordDto {
    private Integer id;

    @JacksonXmlProperty(localName = "Portfolio_Description")
    private String portfolioDescription;

    @JacksonXmlProperty(localName = "Portfolio_Status")
    private String portfolioStatus;
}
