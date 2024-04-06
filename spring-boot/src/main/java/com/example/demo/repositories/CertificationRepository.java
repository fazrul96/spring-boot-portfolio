package com.example.demo.repositories;

import com.example.demo.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Integer> {
    Certification findByTitle(String title);
}
