//package com.example.demo.component.demo;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.configuration.annotation.StepScope;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.stereotype.Component;
//import com.example.demo.data.entity.PortfolioView;
//import com.example.demo.dto.demo.PortfolioRecordDto;
//import com.example.demo.dto.demo.PortfolioTableDto;
//
//import java.time.format.DateTimeFormatter;
//
//import static com.example.demo.constants.BatchConstant.TEST;
//import static com.example.demo.constants.BatchConstant.STATUS_CODE_1;
//
//@Component("DataItemProcessor")
//@Slf4j
//@StepScope
//public class DataItemProcessor implements ItemProcessor<PortfolioView, PortfolioTableDto> {
//
//    @Override
//    public PortfolioTableDto process(PortfolioView portfolioView) {
//        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//
//        PortfolioRecordDto portfolioRecordDto = PortfolioRecordDto.builder()
//                .id(portfolioView.getId())
//                .portfolioStatus(getStatusCode(portfolioView))
//                .build();
//        log.debug("PortfolioRecordDto: {}", portfolioRecordDto);
//        return PortfolioTableDto.builder().portfolioRecordDto(portfolioRecordDto).build();
//    }
//
//    public String getStatusCode(PortfolioView portfolioView) {
//        return switch (portfolioView.getStatus()) {
////            case TEST -> STATUS_CODE_1;
//            default ->  null;
//        };
//    }
//}
