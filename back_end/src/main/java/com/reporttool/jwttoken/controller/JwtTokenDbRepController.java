package com.reporttool.jwttoken.controller;

import com.reporttool.config.PropertyConfig;
import com.reporttool.config.security.model.AccountCredentials;
import com.reporttool.jwttoken.model.TokenDbRepresentationDto;
import com.reporttool.jwttoken.service.JwtTokenDbRepService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@RestController
@RequiredArgsConstructor
@RequestMapping(APP)
@Slf4j
public class JwtTokenDbRepController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenDbRepService tokenService;
    private final PropertyConfig.JWTProperties jwtProperties;

    @PostMapping(NO_AUTH + "/login")
    public ResponseEntity<TokenDbRepresentationDto> createAuthenticationToken(
            @Validated @RequestBody final AccountCredentials request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        /* If authentication is successful, we may create token */
        TokenDbRepresentationDto token = tokenService.createAndSaveTokenDbRepresentation(authentication.getName());

        return ResponseEntity.ok(token);
    }

    @PostMapping(NO_AUTH + "/refresh-token")
    public ResponseEntity<TokenDbRepresentationDto> refreshAuthenticationToken(
            @RequestBody String expirationToken,
            HttpServletRequest request,
            HttpServletResponse response) {
        String jwtToken = request.getHeader(jwtProperties.getHeaderString());
        return ResponseEntity.ok(tokenService.refreshToken(jwtToken, expirationToken));
    }
}
