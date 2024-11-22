package com.example.demo.controller.batch;

import com.example.demo.service.batch.WebtoonBatchJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.demo.constants.ApiConstant.WEBTOONS_SYNC;

@RestController
@RequestMapping(path = "${app.publicApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class WebtoonBatchJobController {

    private final WebtoonBatchJobService webtoonBatchJobService;

    @Autowired
    public WebtoonBatchJobController(WebtoonBatchJobService webtoonBatchJobService) {
        this.webtoonBatchJobService = webtoonBatchJobService;
    }

    @PostMapping(path = WEBTOONS_SYNC)
    public ResponseEntity<String> startWebtoonSyncJob() {
        try {
            webtoonBatchJobService.runWebtoonBatchJob();
            return ResponseEntity.ok("Webtoon sync batch job started successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error starting batch job: " + e.getMessage());
        }
    }
}