package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Integer> {
    Certification findByTitle(String title);
}
