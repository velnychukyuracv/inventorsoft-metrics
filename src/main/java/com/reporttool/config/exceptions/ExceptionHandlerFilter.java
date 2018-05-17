package com.reporttool.config.exceptions;

import com.reporttool.domain.exeption.CustomJwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@AllArgsConstructor
@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    public void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (CustomJwtException e) {

            log.warn("Exception had occurred during authentication process! {}", e.getMessage());
            // custom error response class used across my project
            response.setStatus(401);
            response.getWriter().write("Access denied!!!");
            filterChain.doFilter(request, response);
        }
    }
}
