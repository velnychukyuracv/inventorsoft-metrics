package com.reporttool.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.reporttool.domain.exeption.EncryptionException;
import com.reporttool.sqlresponse.mapper.ObjectExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.NoSuchAlgorithmException;

@Configuration
@RequiredArgsConstructor
public class AppBeanConfig {

    private final PropertyConfig.EncryptionProperties encryptionProperties;
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

    @Bean
    public Cipher getCipher() {
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw new EncryptionException(e);
        }
        return cipher;
    }

    @Bean
    public SecretKey getSecretKey() {
        return new SecretKeySpec(encryptionProperties.getPublicKey().getBytes(),"AES");
    }

    @Bean
    public ObjectMapper getObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }

    @Bean
    public ObjectExtractor getObjectExtractor() {
        return new ObjectExtractor();
    }
}
