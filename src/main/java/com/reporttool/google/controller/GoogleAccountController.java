package com.reporttool.google.controller;

import com.reporttool.google.service.GoogleAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = APP + NO_AUTH + "/googleAccount")
@Slf4j
public class GoogleAccountController {

    private final GoogleAccountService googleAccountService;

    @GetMapping("/login-with-google")
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(googleAccountService.getUrl());
    }

    @GetMapping("/oauth2callback")
    public void getGoogleCode(HttpServletRequest request, HttpServletResponse response) throws IOException, GeneralSecurityException {
        StringBuffer fullUrlBuf = request.getRequestURL();
        if (request.getQueryString() != null) {
            fullUrlBuf.append('?').append(request.getQueryString());
        }
        googleAccountService.getGoogleCode(fullUrlBuf, response);
    }
}