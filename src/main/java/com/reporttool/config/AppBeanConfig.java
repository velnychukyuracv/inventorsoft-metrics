package com.reporttool.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppBeanConfig {

    private final PropertyConfig.CorsProperties corsProperties;
    /**
     * Creates validator of PasswordEncoder that uses the BCrypt strong hashing function. Clients
     * can optionally supply a "strength" (a.k.a. log rounds in BCrypt) and a SecureRandom
     * instance. The larger the strength parameter the more work will have to be done
     * (exponentially) to hash the passwords. The default value is 10.
     *
     * @return {@link BCryptPasswordEncoder}
     */
    @Bean
    @ConditionalOnMissingBean(BCryptPasswordEncoder.class)
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
