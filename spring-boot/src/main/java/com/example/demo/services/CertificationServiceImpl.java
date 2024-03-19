package com.example.demo.services;

import com.example.demo.models.Blog;
import com.example.demo.models.Certification;
import com.example.demo.repositories.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CertificationServiceImpl implements CertificationService {
    private final CertificationRepository certificationRepository;

    @Autowired
    public CertificationServiceImpl(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @Override
    public List<Certification> getCertifications() {
        return certificationRepository.findAll();
    }

    @Override
    public Certification getCertificationById(String id) {
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        return optionalCertification.orElse(null);
    }

    public Certification getCertificationByTitle(String title) {
        return certificationRepository.findByTitle(title);
    }

    @Override
    public Certification saveCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    @Override
    public void deleteCertification(String id) {
        certificationRepository.deleteById(id);
    }
}