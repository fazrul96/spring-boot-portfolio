package com.example.demo.controllers;

import com.example.demo.entity.ProjectItem;
import com.example.demo.services.modules.ProjectItemService;
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
public class ProjectItemControllerTest {
    @InjectMocks
    private ProjectItemController projectItemController;
    @Mock
    private ProjectItemService projectItemService;

    @Test
    public void testGetProjectItems() {

    }
}
