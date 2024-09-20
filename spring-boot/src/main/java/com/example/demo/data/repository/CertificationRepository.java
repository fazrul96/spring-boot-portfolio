package com.example.demo.data.repository;

import com.example.demo.data.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Integer> {
    Certification findByTitle(String title);
}
