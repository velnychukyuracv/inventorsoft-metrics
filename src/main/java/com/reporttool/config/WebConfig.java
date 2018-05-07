package com.reporttool.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.reporttool.domain.constants.MetricConstants.APP;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final PropertyConfig.CorsProperties corsProperties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(APP + "/**")
                .allowedOrigins(corsProperties.getOrigins())
                .allowedMethods("GET", "PUT", "POST", "DELETE", "PATCH");
    }
}
