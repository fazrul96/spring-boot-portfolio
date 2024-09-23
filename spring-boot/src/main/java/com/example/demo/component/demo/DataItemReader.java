//package com.example.demo.component.demo;
//
//import lombok.extern.slf4j.Slf4j;
//import org.apache.commons.collections4.CollectionUtils;
//import org.springframework.batch.core.JobExecution;
//import org.springframework.batch.core.StepExecution;
//import org.springframework.batch.core.annotation.BeforeStep;
//import org.springframework.batch.core.configuration.annotation.StepScope;
//import org.springframework.batch.item.ExecutionContext;
//import org.springframework.batch.item.support.AbstractItemCountingItemStreamItemReader;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import com.example.demo.data.entity.PortfolioView;
//import com.example.demo.data.repository.PortfolioMaterializedViewRepository;
//import com.example.demo.properties.BatchProperties;
//import com.example.demo.util.BatchUtil;
//
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//import java.util.List;
//
//@Component("DataItemReader")
//@Slf4j
//@StepScope
//public class DataItemReader extends AbstractItemCountingItemStreamItemReader<PortfolioView> {
//
//    private ExecutionContext jobContext;
//
//    private final Object lock = new Object();
//
//    @Autowired
//    private PortfolioMaterializedViewRepository portfolioMaterializedViewRepository;
//
//    private List<PortfolioView> results;
//
//    private int current;
//
//    private final BatchProperties batchProperties;
//
//    public DataItemReader(BatchProperties batchProperties) {
//        this.batchProperties = batchProperties;
//        setName(this.getClass().getName());
//    }
//
//    @BeforeStep
//    public void beforeStep(StepExecution stepExecution) {
//        JobExecution jobExecution = stepExecution.getJobExecution();
//        jobContext = jobExecution.getExecutionContext();
//    }
//
//    private List<PortfolioView> doSearch() {
//        List<PortfolioView> portfolioViewList;
//
//        LocalDate yesterdayDate = BatchUtil.retrieveDate(1);
//        String yesterdayStartDateTime = LocalDateTime.of(yesterdayDate, LocalTime.MIN).toString();
//        String yesterdayEndDateTime = LocalDateTime.of(yesterdayDate, LocalTime.MAX).toString();
//        portfolioViewList = portfolioMaterializedViewRepository
//                .findByUpdatedDateBetween(yesterdayStartDateTime, yesterdayEndDateTime);
//        jobContext.put("startDate", yesterdayDate);
//        jobContext.put("endDate", yesterdayDate);
//
//        Integer totalRecordCount = portfolioViewList.size();
//
//        for (PortfolioView portfolioView : portfolioViewList) {
//            if (portfolioView.getId().equals(1)) {
//                totalRecordCount++;
//            }
//        }
//
//        log.debug("");
//        jobContext.put("totalRecordCount", totalRecordCount);
//        return portfolioViewList;
//    }
//
//    @Override
//    protected PortfolioView doRead() {
//        synchronized (lock) {
//            if (results == null) {
//                current = 0;
//                results = doSearch();
//            }
//
//            if (CollectionUtils.isNotEmpty(results) && current < results.size()) {
//                PortfolioView currentRecord = results.get(current);
//                current++;
//                return currentRecord;
//            } else {
//                return null;
//            }
//        }
//    }
//
//    @Override
//    protected void doOpen() {
//        // Do nothing
//    }
//
//    @Override
//    protected void doClose() {
//        synchronized (lock) {
//            current = 0;
//            results = null;
//        }
//    }
//}
