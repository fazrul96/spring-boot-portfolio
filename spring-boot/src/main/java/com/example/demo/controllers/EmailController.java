package com.example.demo.controllers;

import com.example.demo.services.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.context.Context;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class EmailController {
    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public String sendEmail() throws MessagingException {
        String to = "recipient@example.com";
        String from = "sender@example.com";
        String subject = "LinkedIn Introduction";
        String text = "I wanted to introduce myself to you on LinkedIn and share a few of my recent projects.";
        String linkedInProfileLink = "https://www.linkedin.com/in/your-profile-link";

        Context context = new Context(); // Create a new Context
        context.setVariable("message", text);
        context.setVariable("linkedInProfileLink", linkedInProfileLink);

        emailService.sendEmail(to, from, subject, "email-template", context);
        logger.info("Email sent successfully to: {}", to);
        return "Email sent successfully!";
    }
}
