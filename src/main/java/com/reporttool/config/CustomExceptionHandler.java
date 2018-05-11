package com.reporttool.config;

import com.reporttool.domain.exeption.EncryptionException;
import com.reporttool.domain.exeption.MappingException;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.mail.MessagingException;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUserNameNotFoundException(Exception ex, WebRequest request) {
        return handleExceptionInternal(
                ex,
                ex.getMessage(),
                new HttpHeaders(),
                HttpStatus.UNAUTHORIZED,
                request);
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(Exception ex, WebRequest request) {
        return handleExceptionInternal(
                ex,
                ex.getMessage(),
                new HttpHeaders(),
                HttpStatus.NOT_FOUND,
                request);
    }

    @ExceptionHandler(value = MessagingException.class)
    public ResponseEntity<Object> handleMessagingException(Exception ex, WebRequest request) {
        return handleExceptionInternal(
                ex,
                ex.getMessage(),
                new HttpHeaders(),
                HttpStatus.SERVICE_UNAVAILABLE,
                request);
    }

    @ExceptionHandler(value = EncryptionException.class)
    public ResponseEntity<Object> handleEncryptionException(Exception ex, WebRequest request) {
        return handleExceptionInternal(
                ex,
                ex.getMessage(),
                new HttpHeaders(),
                HttpStatus.SERVICE_UNAVAILABLE,
                request);
    }

    @ExceptionHandler(value = MappingException.class)
    public ResponseEntity<Object> handleMappingException(Exception ex, WebRequest request) {
        return handleExceptionInternal(
                ex,
                ex.getMessage(),
                new HttpHeaders(),
                HttpStatus.SERVICE_UNAVAILABLE,
                request);
    }
}
