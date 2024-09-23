package com.example.demo.controller;

import com.example.demo.service.email.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

@Slf4j
@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
@SuppressWarnings({"PMD.UseObjectForClearerAPI"})
public class EmailController {
    @Autowired
    private EmailService emailService;

    @Operation(summary = "Send an email")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Email sent successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/sendEmail")
    public String sendEmail() throws MessagingException {
        String recipientEmail = "recipient@example.com";
        String senderEmail = "sender@example.com";
        String emailSubject = "LinkedIn Introduction";
        String emailMessage = "I wanted to introduce myself to you on LinkedIn and share a few of my recent projects.";
        String linkedInProfileLink = "https://www.linkedin.com/in/your-profile-link";

        Context emailContext = new Context();
        emailContext.setVariable("message", emailMessage);
        emailContext.setVariable("linkedInProfileLink", linkedInProfileLink);

        emailService.sendEmail(recipientEmail, senderEmail, emailSubject, "email-template", emailContext);

        log.info("Email sent successfully to: {}", recipientEmail);
        return "Email sent successfully!";
    }

    @GetMapping("/status/{id}")
    public String getEmailStatus(@RequestParam String emailId) {
        return "Email status: Delivered";
    }
}