package com.example.demo.service.web;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.*;
import java.util.*;

@Service
public class BloodPressureService {

    public Map<String, Object> processBloodPressureData(MultipartFile file) throws IOException {
        List<String> timeData = new ArrayList<>();
        List<Integer> systolicBp = new ArrayList<>();
        List<Integer> diastolicBp = new ArrayList<>();
        int systolicTarget = 0;
        int diastolicTarget = 0;

        try (Reader reader = new InputStreamReader(file.getInputStream())) {
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());

            for (CSVRecord record : csvParser) {
                timeData.add(record.get("time"));
                systolicBp.add(Integer.parseInt(record.get("systolic")));
                diastolicBp.add(Integer.parseInt(record.get("diastolic")));
                if (systolicTarget == 0) {
                    systolicTarget = Integer.parseInt(record.get("systolic_target"));
                    diastolicTarget = Integer.parseInt(record.get("diastolic_target"));
                }
            }
        }

        // Prepare the result map
        Map<String, Object> result = new HashMap<>();
        result.put("timeData", timeData);
        result.put("systolicBp", systolicBp);
        result.put("diastolicBp", diastolicBp);
        result.put("systolicTarget", systolicTarget);
        result.put("diastolicTarget", diastolicTarget);

        return result;
    }
}
