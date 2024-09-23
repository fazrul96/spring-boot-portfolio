package com.example.demo.controller;

import com.example.demo.service.modules.ProjectItemService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class ProjectItemControllerTest {
    @InjectMocks
    private ProjectItemController projectItemController;
    @Mock
    private ProjectItemService projectItemService;

    @Test
    public void testGetProjectItems() {

    }
}
