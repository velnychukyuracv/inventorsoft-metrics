package com.reporttool.domain.exeption;

import org.springframework.security.access.AccessDeniedException;

public class CustomJwtException extends AccessDeniedException {

    public CustomJwtException(String message) {
        super(message);
    }
}
