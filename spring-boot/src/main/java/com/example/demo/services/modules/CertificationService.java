package com.example.demo.services.modules;

import com.example.demo.entity.Certification;
import com.example.demo.repositories.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificationService {
    private final CertificationRepository certificationRepository;

    @Autowired
    public CertificationService(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    public List<Certification> getCertifications() {
        return certificationRepository.findAll();
    }

    public Certification getCertificationById(Integer id) {
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        return optionalCertification.orElse(null);
    }

    public Certification getCertificationByTitle(String title) {
        return certificationRepository.findByTitle(title);
    }

    public Certification saveCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    public void deleteCertification(Integer id) {
        certificationRepository.deleteById(id);
    }
}