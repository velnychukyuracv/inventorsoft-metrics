package com.reporttool.domain.exeption;

import io.jsonwebtoken.JwtException;
import lombok.Getter;
import org.springframework.security.access.AccessDeniedException;

@Getter
public class CustomJwtException extends AccessDeniedException {

    private JwtException exception;

    public CustomJwtException(String message) {
        super(message);
    }

    public CustomJwtException(String message, JwtException exception) {
        super(message);
        this.exception = exception;
    }
}
