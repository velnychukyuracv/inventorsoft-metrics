package com.reporttool.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;


/**
 * Configures beans to provide access to resources.
 */
@Configuration
@EnableConfigurationProperties({PropertyConfig.JWTProperties.class, PropertyConfig.ApplicationProperties.class})
public class PropertyConfig {

    @Getter
    @Setter
    @ConfigurationProperties("jwt")
    public static class JWTProperties {
        private Long expiration;
        private String secret;
        private String tokenprefix;
        private String headerstring;
    }

    @Getter
    @Setter
    @ConfigurationProperties("application")
    public static class ApplicationProperties {
        private String host;
        private String protocol;
    }
}
