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

    @PostMapping(value = "/forgetPassword")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAndSendToken(@RequestParam(name = "email") @Email String email) {
        passwordResetService.createAndSendToken(email);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/forgetPassword/resetPassword")
    public void savePassword(@Validated PasswordResetForm passwordResetForm) {
        passwordResetService.changeUserPassword(passwordResetForm.getToken(), passwordResetForm.getPassword());
    }
}
