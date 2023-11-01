package com.example.demo.services;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
@Service
public class EmailService {
    @Autowired
    private EmailTemplateService emailTemplateService;

    public void sendEmail(String to, String from, String subject, String templateName, Context context) throws MessagingException {
        emailTemplateService.sendTemplatedEmail(to, from, subject, templateName, context);
    }
}