package com.reporttool.common.mail.service;

import com.reporttool.domain.model.User;
import com.reporttool.common.mail.model.EmailBuilder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import static java.util.Objects.nonNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private static final String RESET_PASS_SUBJECT = "Reset password on InventorSoft-Metrics";

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.default-encoding}")
    private String encoding;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Async
    public void sendEmail(EmailBuilder emailBuilder) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, encoding);
        helper.setTo(new InternetAddress(emailBuilder.getToEmail()));
        helper.setFrom(emailBuilder.getFromEmail());
        helper.setSubject(emailBuilder.getSubject());

        if (nonNull(emailBuilder.getFileName()) && nonNull(emailBuilder.getFile())) {
            helper.addAttachment(emailBuilder.getFileName(), emailBuilder.getFile());
        }

        mimeMessage.setContent(emailBuilder.getBody(), "text/html");
        javaMailSender.send(mimeMessage);
        log.debug("An email was sent to {}", emailBuilder.getToEmail());
    }

    /**
     * Send reset link to email, under which {@link User}'ve been sign up.
     */
    @SneakyThrows
    public void sendResetToken(String token, User user) {
        sendEmail(user.getEmail(), senderEmail, RESET_PASS_SUBJECT, token);
    }

    private void sendEmail(String to, String from, String subject, String body) throws MessagingException {
        EmailBuilder email = EmailBuilder.builder()
                .toEmail(to)
                .fromEmail(from)
                .subject(subject)
                .body(body)
                .build();
        sendEmail(email);
    }
}
