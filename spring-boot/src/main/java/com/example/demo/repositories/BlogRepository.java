package com.example.demo.repositories;

import com.example.demo.models.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, String> {
    Blog findByAlias(String alias);
}
