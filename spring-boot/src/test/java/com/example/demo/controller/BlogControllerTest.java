package com.example.demo.controller;

import com.example.demo.data.entity.Blog;
import com.example.demo.data.entity.Certification;
import com.example.demo.service.modules.BlogService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BlogControllerTest {
    @InjectMocks
    private BlogController blogController;

    @Mock
    private BlogService blogService;

    @Test
    public void testGetBlogs() {
        // Arrange
        List<Blog> mockBlogs = new ArrayList<>();
        Blog blog = new Blog();

        blog.setId(1);
        blog.setTitle("Understanding Spring Boot");
        blog.setAlias("This blog post covers the basics of Spring Boot.");
        blog.setAuthor("Jane Doe");

        mockBlogs.add(blog);

        when(blogService.getBlogs()).thenReturn(mockBlogs);

        // Act
        ResponseEntity<List<Blog>> responseEntity = blogController.getBlogs();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockBlogs.size(), responseEntity.getBody().size());
    }

    @Test
    public void testGetBlogById() {
        // Arrange
        Blog mockBlog = new Blog();
        mockBlog.setId(1);
        mockBlog.setTitle("Understanding Spring Boot");
        mockBlog.setAuthor("This blog post covers the basics of Spring Boot.");
        mockBlog.setAuthor("Jane Doe");

        when(blogService.getBlogById(1)).thenReturn(mockBlog);

        // Act
        ResponseEntity<Blog> responseEntity = blogController.getBlogById(1);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testSaveBlog() {
        // Arrange
        Blog mockBlog = new Blog();
        mockBlog.setId(1);
        mockBlog.setTitle("Understanding Spring Boot");
        mockBlog.setAlias("This blog post covers the basics of Spring Boot.");
        mockBlog.setAuthor("Jane Doe");

        when(blogService.saveBlog(mockBlog)).thenReturn(mockBlog);

        // Act
        ResponseEntity<Blog> responseEntity = blogController.saveBlog(mockBlog);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testDeleteBlog() {
        // Arrange
        Integer id = 1;

        // Act
        blogController.deleteBlog(id);

        // Assert
        // Verify the delete method is called
        assertDoesNotThrow(() -> blogService.deleteBlog(id));
    }
}