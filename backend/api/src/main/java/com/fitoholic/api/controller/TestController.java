// File: src/main/java/com/fitoholic/api/controller/TestController.java
package com.fitoholic.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class TestController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from your Spring Boot Backend!";
    }
}
