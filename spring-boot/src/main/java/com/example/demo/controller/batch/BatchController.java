//package com.example.demo.controller.batch;
//
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobParameters;
//import org.springframework.batch.core.JobParametersBuilder;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/batch")
//public class BatchController {
//
//    @Autowired
//    private JobLauncher jobLauncher;
//
//    @Autowired
//    private Job sampleJob;
//
//    @GetMapping("/run")
//    public ResponseEntity<String> runBatch() {
//        try {
//            JobParameters jobParameters = new JobParametersBuilder()
//                    .addLong("time", System.currentTimeMillis())
//                    .toJobParameters();
//            jobLauncher.run(sampleJob, jobParameters);
//            return ResponseEntity.ok("Batch job has been invoked.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error running batch job: " + e.getMessage());
//        }
//    }
//}