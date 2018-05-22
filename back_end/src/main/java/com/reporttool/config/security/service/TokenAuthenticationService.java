package com.reporttool.config.security.service;

import com.reporttool.config.PropertyConfig;
import com.reporttool.jwttoken.service.JwtTokenDbRepService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenAuthenticationService {

    private final PropertyConfig.JWTProperties jwtProperties;
    private final JwtTokenDbRepService jwtTokenDbRepService;
    


    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String jwtToken = request.getHeader(jwtProperties.getHeaderString());
        if (jwtToken != null) {
            String userEmail = jwtTokenDbRepService.parseToken(jwtToken);
            if(nonNull(userEmail) && nonNull(jwtTokenDbRepService.findTokenDbRepByJwtToken(jwtToken))) {
                log.debug("Creating Authentication for user: {}", userEmail);
                return new UsernamePasswordAuthenticationToken(userEmail, null, emptyList());
            } else {
                log.warn("There was an attempt to receive authentication for fake user with token: ", jwtToken);
                return null;
            }
        }

        return null;
    }
}
