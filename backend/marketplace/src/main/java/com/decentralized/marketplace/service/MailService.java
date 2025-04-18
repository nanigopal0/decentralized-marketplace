package com.decentralized.marketplace.service;

import com.decentralized.marketplace.dto.MailDTO;
import jakarta.mail.MessagingException;
import java.util.Map;

public interface MailService {

    String sendMail(MailDTO mailDTO) throws MessagingException;

    String sendTemplatedMail(String to, String subject, String templateName, Map<String, Object> model) throws MessagingException;
}
