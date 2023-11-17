package com.example.demo.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailTemplateService {
    private static final Logger logger = LoggerFactory.getLogger(EmailTemplateService.class);
    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendTemplatedEmail(String to, String from, String subject, String templateName, Context context) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);

            String htmlContent = templateEngine.process(templateName, context);

            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);

            logger.info("Email sent successfully to: {}", to);
        } catch (MessagingException | MailException e) {
            logger.error("Failed to send email: " + e.getMessage());
        }
    }
}