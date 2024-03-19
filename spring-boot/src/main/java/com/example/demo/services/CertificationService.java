package com.example.demo.services;

import com.example.demo.models.Certification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CertificationService {
    List<Certification> getCertifications();
    Certification getCertificationById(String id);
    Certification saveCertification(Certification certification);
    void deleteCertification(String id);
}