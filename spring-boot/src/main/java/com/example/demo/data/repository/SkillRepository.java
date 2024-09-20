package com.example.demo.data.repository;

import com.example.demo.data.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Skill findByName(String name);
}
