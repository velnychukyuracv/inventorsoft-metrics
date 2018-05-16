package com.reporttool.config.security.service;

import com.reporttool.config.PropertyConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenAuthenticationService {

    private final PropertyConfig.JWTProperties jwtProperties;

    public void addAuthentication(HttpServletResponse res, String userName) {
        String JWT = createToken(userName);
        res.addHeader(jwtProperties.getHeaderString(), JWT);
        log.debug("Token was added to response for:", userName);
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String string = jwtProperties.getHeaderString();
        String token = request.getHeader(string);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret())
                    .parseClaimsJws(token.replace(jwtProperties.getTokenPrefix(), ""))
                    .getBody()
                    .getSubject();

            if(nonNull(user)) {
                log.debug("Authentication was created for user: {}", user);
                return new UsernamePasswordAuthenticationToken(user, null, emptyList());
            } else {
                log.warn("There was an attempt to receive authentication for fake user with token: ", token);
                return null;
            }
        }

        return null;
    }

    public String createToken(String userName) {
        String token = jwtProperties.getTokenPrefix() + " " + Jwts.builder()
                .setSubject(userName)
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
        log.debug("Token was created for user: {}", userName);
        return token;
    }
}
