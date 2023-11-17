package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "${app.apiPath}")
public class MapController {
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping("/map")
    public String showMap() {
        return "googlemap";
    }
}
