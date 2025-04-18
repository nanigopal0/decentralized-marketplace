package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.dto.MailDTO;
import com.decentralized.marketplace.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    @Autowired
    @Qualifier("freemarkerConfiguration")
    private Configuration freemarkerConfig;

    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public String sendMail(MailDTO mailDTO) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        helper.setTo(mailDTO.getTo());
        helper.setFrom(mailDTO.getFrom() != null && !mailDTO.getFrom().isEmpty() ? mailDTO.getFrom() : from);
        helper.setSubject(mailDTO.getSubject());
        helper.setText(mailDTO.getBody(), true); // Set to true to enable HTML content
        mailSender.send(mimeMessage);
        return "Mail sent successfully to " + mailDTO.getTo();
    }

    @Override
    public String sendTemplatedMail(String to, String subject, String templateName, Map<String, Object> model) throws MessagingException {
        try {
            Template template = freemarkerConfig.getTemplate(templateName);
            String htmlContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(to);
            helper.setFrom(from);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            return "Templated mail sent successfully to " + to;
        } catch (IOException | TemplateException e) {
            log.error("Error processing email template: {}", e.getMessage(), e);
            throw new MessagingException("Failed to process email template: " + e.getMessage(), e);
        }
    }
}
