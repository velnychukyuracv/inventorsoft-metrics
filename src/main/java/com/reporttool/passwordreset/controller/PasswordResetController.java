package com.reporttool.passwordreset.controller;

import com.reporttool.domain.model.User;
import com.reporttool.domain.service.UserService;
import com.reporttool.exeption.ResourceNotFoundException;
import com.reporttool.mail.service.MailService;
import com.reporttool.passwordreset.model.PasswordResetForm;
import com.reporttool.domain.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Email;

@RestController
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;
    private final UserService userService;
    private final MailService mailService;

    @PostMapping(value = "/forgetPassword")
    @ResponseStatus(HttpStatus.CREATED)
    public void sendCreateAndSendToken(@RequestParam(name = "email") @Email String email) {
        User user = userService.findByEmail(email).orElseThrow(ResourceNotFoundException:: new);
        String token = passwordResetService.createToken(user).getToken();
        mailService.sendResetToken(token, user);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/forgetPassword/resetPassword")
    public void savePassword(@Validated PasswordResetForm passwordResetForm) {
        passwordResetService.changeUserPassword(passwordResetForm.getToken(), passwordResetForm.getPassword());
    }
}
