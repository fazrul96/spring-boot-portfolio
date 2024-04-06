package com.example.demo.services.modules;

import com.example.demo.entity.Education;
import com.example.demo.repositories.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService {
    private final EducationRepository educationRepository;

    @Autowired
    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<Education> getEducations() {
        return educationRepository.findAll();
    }

    public Education getEducationById(Integer id) {
        Optional<Education> optionalEducation = educationRepository.findById(id);
        return optionalEducation.orElse(null);
    }

    public Education getEducationByName(String name) {
        return educationRepository.findByName(name);
    }

    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    public void deleteEducation(Integer id) {
        educationRepository.deleteById(id);
    }
}