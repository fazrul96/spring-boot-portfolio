package com.example.demo.controller.web.management;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public abstract class BaseController {
    protected <T> ResponseEntity<T> success(T body) {
        return ResponseEntity.ok(body);
    }

    protected <T> ResponseEntity<T> created(T body) {
        return ResponseEntity.status(201).body(body);
    }

    protected ResponseEntity<Void> noContent() {
        return ResponseEntity.noContent().build();
    }

    protected ResponseEntity<String> error(String message) {
        return ResponseEntity.status(500).body(message);
    }
}
