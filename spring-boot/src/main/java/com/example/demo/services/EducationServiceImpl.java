package com.example.demo.services;

import com.example.demo.models.Education;
import com.example.demo.repositories.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationServiceImpl implements EducationService {
    private final EducationRepository educationRepository;

    @Autowired
    public EducationServiceImpl(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Override
    public List<Education> getEducations() {
        return educationRepository.findAll();
    }

    @Override
    public Education getEducationById(String id) {
        Optional<Education> optionalEducation = educationRepository.findById(id);
        return optionalEducation.orElse(null);
    }

    public Education getEducationByName(String name) {
        return educationRepository.findByName(name);
    }

    @Override
    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    @Override
    public void deleteEducation(String id) {
        educationRepository.deleteById(id);
    }
}