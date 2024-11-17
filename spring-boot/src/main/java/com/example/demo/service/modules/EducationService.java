package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Education;
import com.example.demo.data.portfolio.repository.EducationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EducationService {
    private final EducationRepository educationRepository;

    @Autowired
    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    public Optional<Education> getEducationById(Integer id) {
        return educationRepository.findById(id);
    }

    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    public boolean deleteEducation(Integer id) {
        if (educationRepository.existsById(id)) {
            educationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}