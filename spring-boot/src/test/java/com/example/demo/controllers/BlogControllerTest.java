package com.example.demo.controllers;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Skill;
import com.example.demo.services.modules.BlogService;
import com.example.demo.services.modules.SkillService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class BlogControllerTest {
    @InjectMocks
    private BlogController blogController;
    @Mock
    private BlogService blogService;

    @Test
    public void testGetBlogs() {
        List<Blog> mockBlogs = new ArrayList<>();
        Blog blog = new Blog();

        blog.setId(1);
        blog.setAlias("solo-levelling");
        blog.setImage("https://cdn.archonia.com/images/1-104028982-1-2-original1/solo-leveling-vol-02-gn-manga.jpg");
        blog.setTitle("Solo Levelling");
        blog.setAuthor("SIU");
        blog.setGenre("Fantasy | Action");
        blog.setDescription("Solo");
        blog.setDatetime(null);
        blog.setRating(null);
        mockBlogs.add(blog);

        when(blogService.getBlogs()).thenReturn(mockBlogs);
        List<Blog> actualBlogs = blogController.getBlogs();

        assertEquals(mockBlogs.size(), actualBlogs.size());
        assertEquals(mockBlogs.get(0).getId(), actualBlogs.get(0).getId());
        assertEquals(mockBlogs.get(0).getAlias(), actualBlogs.get(0).getAlias());
        assertEquals(mockBlogs.get(0).getImage(), actualBlogs.get(0).getImage());
        assertEquals(mockBlogs.get(0).getTitle(), actualBlogs.get(0).getTitle());
        assertEquals(mockBlogs.get(0).getAuthor(), actualBlogs.get(0).getAuthor());
        assertEquals(mockBlogs.get(0).getGenre(), actualBlogs.get(0).getGenre());
        assertEquals(mockBlogs.get(0).getDescription(), actualBlogs.get(0).getDescription());
        assertEquals(mockBlogs.get(0).getDatetime(), actualBlogs.get(0).getDatetime());
        assertEquals(mockBlogs.get(0).getRating(), actualBlogs.get(0).getRating());

        when(blogService.getBlogById(1)).thenReturn(blog);
        Blog actualBlog = blogController.getBlogById(1);

        assertNotNull(actualBlog);
        assertEquals(mockBlogs.get(0).getId(), actualBlog.getId());
        assertEquals(mockBlogs.get(0).getAlias(), actualBlog.getAlias());
        assertEquals(mockBlogs.get(0).getImage(), actualBlog.getImage());
        assertEquals(mockBlogs.get(0).getTitle(), actualBlog.getTitle());
        assertEquals(mockBlogs.get(0).getAuthor(), actualBlog.getAuthor());
        assertEquals(mockBlogs.get(0).getGenre(), actualBlog.getGenre());
        assertEquals(mockBlogs.get(0).getDescription(), actualBlog.getDescription());
        assertEquals(mockBlogs.get(0).getDatetime(), actualBlog.getDatetime());
        assertEquals(mockBlogs.get(0).getRating(), actualBlog.getRating());
    }
}
