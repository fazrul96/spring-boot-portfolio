package com.example.demo.dto.demo;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RootDto {
    @JacksonXmlProperty(localName = "Portfolio")
    private PortfolioDto portfolioDto;
}
