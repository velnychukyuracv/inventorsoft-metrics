package com.reporttool.userview.controller;

import com.reporttool.config.PropertyConfig;
import com.reporttool.config.security.model.AccountCredentials;
import com.reporttool.config.security.service.TokenAuthenticationService;
import com.reporttool.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
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
public class JwtTokenController {

    private final AuthenticationManager authenticationManager;
    private final TokenAuthenticationService tokenService;
    private final UserService userService;
    private final PropertyConfig.JWTProperties jwtProperties;

    @PostMapping(NO_AUTH + "/login")
    public ResponseEntity<String> createAuthenticationToken(
            @Validated @RequestBody final AccountCredentials request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        /* If authentication is successful, we may create token */
        final String token = tokenService.createToken(authentication.getName());

        userService.setUsersLastSignInField(request.getUserName());

        return ResponseEntity.ok(token);
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<String> refreshAuthenticationToken(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader(jwtProperties.getHeaderString());
        String userEmail = tokenService.parseToken(token);
        return ResponseEntity.ok(tokenService.createToken(userEmail));
    }
}
