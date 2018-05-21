package com.reporttool.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configures beans to provide access to resources.
 */
@Configuration
@EnableConfigurationProperties({
        PropertyConfig.JWTProperties.class,
        PropertyConfig.ApplicationProperties.class,
        PropertyConfig.CorsProperties.class,
        PropertyConfig.EncryptionProperties.class,
        PropertyConfig.GoogleProperties.class
})
public class PropertyConfig {

    @Getter
    @Setter
    @ConfigurationProperties("jwt")
    public static class JWTProperties {
        private Long expiration;
        private String secret;
        private String tokenPrefix;
        private String headerString;
    }

    @Getter
    @Setter
    @ConfigurationProperties("application")
    public static class ApplicationProperties {
        private String host;
        private String protocol;
    }

    @Getter
    @Setter
    @ConfigurationProperties("cors")
    public static class CorsProperties {
        private String origins;
    }

    @Getter
    @Setter
    @ConfigurationProperties("encryption")
    public static class EncryptionProperties {
        private String publicKey;
    }

    @Getter
    @Setter
    @ConfigurationProperties("spring.google")
    public static class GoogleProperties {
        private String googleClientId;
        private String googleClientSecret;
        private String googleRedirectUri;
    }
}
