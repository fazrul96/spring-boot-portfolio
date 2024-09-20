package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class MapController {
    @GetMapping("/map")
    public String showMap() {
        return "googlemap";
    }
}
