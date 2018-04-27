package com.reporttool.userview.controller;

import com.reporttool.domain.service.PasswordResetService;
import com.reporttool.userview.model.PasswordResetForm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Email;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = APP + NO_AUTH + "/forgetPassword")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createAndSendToken(@RequestParam(name = "email") @Email String email) {
        passwordResetService.createAndSendToken(email);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/resetPassword")
    public void savePassword(@Validated PasswordResetForm passwordResetForm) {
        passwordResetService.changeUserPassword(passwordResetForm.getToken(), passwordResetForm.getPassword());
    }
}
