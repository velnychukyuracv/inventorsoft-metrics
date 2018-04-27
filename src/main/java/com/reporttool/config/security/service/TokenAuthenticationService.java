package com.reporttool.config.security.service;

import com.reporttool.config.PropertyConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import static java.util.Collections.emptyList;

@Service
@RequiredArgsConstructor
public class TokenAuthenticationService {

    private final PropertyConfig.JWTProperties jwtProperties;

    public void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
        res.addHeader(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + JWT);
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String string = jwtProperties.getHeaderstring();
        String token = request.getHeader(string);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret())
                    .parseClaimsJws(token.replace(jwtProperties.getTokenprefix(), ""))
                    .getBody()
                    .getSubject();

            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, emptyList()) :
                    null;
        }

        return null;
    }
}
