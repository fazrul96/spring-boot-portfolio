package com.example.demo.dto.demo;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentDto {
    @JacksonXmlProperty(localName = "PortfolioTable")
    private PortfolioTableDto portfolioTableDto;
}
