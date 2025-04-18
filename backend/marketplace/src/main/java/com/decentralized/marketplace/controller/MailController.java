package com.decentralized.marketplace.controller;


import com.decentralized.marketplace.dto.MailDTO;
import com.decentralized.marketplace.service.MailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("send")
    public ResponseEntity<String> sendMail(@RequestBody MailDTO mailDTO) throws MessagingException {
        return ResponseEntity.ok(mailService.sendMail(mailDTO));
    }
}
