package com.example.demo.services;

import com.example.demo.models.Education;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface EducationService {
    List<Education> getEducations();
    Education getEducationById(String id);
    Education saveEducation(Education education);
    void deleteEducation(String id);
}