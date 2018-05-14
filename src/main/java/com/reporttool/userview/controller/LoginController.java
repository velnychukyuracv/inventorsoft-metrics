package com.reporttool.userview.controller;

import com.reporttool.config.security.model.AccountCredentials;
import com.reporttool.config.security.service.TokenAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@RestController
@RequiredArgsConstructor
@RequestMapping(APP + NO_AUTH + "/login")
@Slf4j
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final TokenAuthenticationService tokenService;

    @PostMapping()
    public ResponseEntity<String> createAuthenticationToken(
            @Validated @RequestBody final AccountCredentials request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        /* If authentication is successful, we may create token */
        final String token = tokenService.createToken(authentication.getName());

        return ResponseEntity.ok(token);
    }
}