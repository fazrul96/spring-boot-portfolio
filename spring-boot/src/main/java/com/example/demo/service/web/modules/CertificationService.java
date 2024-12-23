package com.example.demo.service.web.modules;

import com.example.demo.data.portfolio.entity.Certification;
import com.example.demo.data.portfolio.repository.CertificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
public class CertificationService {
    private final CertificationRepository certificationRepository;

    @Autowired
    public CertificationService(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    public Certification getCertificationById(Integer id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Certification not found"));
    }

    public Certification getCertificationByTitle(String title) {
        return certificationRepository.findByTitle(title);
    }

    public Certification saveCertification(Certification certification) {
        // Add any additional logic or validation here if needed
        return certificationRepository.save(certification);
    }

    public void deleteCertification(Integer id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Certification not found");
        }
        certificationRepository.deleteById(id);
    }
}