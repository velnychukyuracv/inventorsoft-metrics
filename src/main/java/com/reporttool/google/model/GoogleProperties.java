package com.reporttool.google.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Data
@Component
public class GoogleProperties {

    private String googleClientId;
    private String googleClientSecret;
    private String googleRedirectUri;

    @Inject
    public GoogleProperties(@Value("${spring.google.googleClientId}") String googleClientId,
                            @Value("${spring.google.googleClientSecret}") String googleClientSecret,
                            @Value("${spring.google.googleRedirectUri}") String googleRedirectUri) {
        this.googleClientId = googleClientId;
        this.googleClientSecret = googleClientSecret;
        this.googleRedirectUri = googleRedirectUri;
    }
}
