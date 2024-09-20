package com.example.demo.data.repository;

import com.example.demo.data.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    Blog findByAlias(String alias);
}
