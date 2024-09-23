package com.example.demo.service.email;

import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@SuppressWarnings({"PMD.UseObjectForClearerAPI"})
public class EmailService {
    @Autowired
    private EmailTemplateService emailTemplateService;

    public void sendEmail(String to, String from, String subject, String templateName, Context context)
            throws MessagingException {
        emailTemplateService.sendTemplatedEmail(to, from, subject, templateName, context);
    }
}