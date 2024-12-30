package com.example.demo.dto.demo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HeaderDto {
    @JacksonXmlProperty(localName = "Code")
    private String code;

    @JacksonXmlProperty(localName = "Run_Date")
    private String runDate;

    @JacksonXmlProperty(localName = "Start_Date")
    private String startDate;

    @JacksonXmlProperty(localName = "End_Date")
    private String endDate;

    @JacksonXmlProperty(localName = "Total_Record_Count")
    private String totalRecordCount;
}
