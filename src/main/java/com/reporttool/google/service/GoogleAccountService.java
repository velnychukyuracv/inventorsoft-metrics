package com.reporttool.google.service;

import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.reporttool.domain.model.User;
import com.reporttool.domain.service.UserService;
import com.reporttool.google.model.GoogleProperties;
import com.reporttool.config.security.service.TokenAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Optional;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleAccountService {

    private static final String USER_INFO_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
    private static final String USER_INFO_PROFILE = "https://www.googleapis.com/auth/userinfo.profile";
    private static final String GOOGLE_ACCOUNT_STATE = "/profile";
    private static final String TOKEN_SERVER_ENCODED_URL = "https://www.googleapis.com/oauth2/v4/token";

    private final UserService userService;
    private final GoogleProperties googleProperties;
    private final TokenAuthenticationService tokenService;


    public String getUrl() {
        return new GoogleAuthorizationCodeRequestUrl(googleProperties.getGoogleClientId(),
                googleProperties.getGoogleRedirectUri(), Arrays.asList(
                USER_INFO_EMAIL,
                USER_INFO_PROFILE)).setState(GOOGLE_ACCOUNT_STATE).build();
    }

    public void getGoogleCode(StringBuffer stringBuffer, HttpServletResponse response) throws GeneralSecurityException, IOException {
        AuthorizationCodeResponseUrl authResponse =
                new AuthorizationCodeResponseUrl(stringBuffer.toString());

        if (isNull(authResponse.getError())) {
            String code = authResponse.getCode();
            requestAccessToken(code,response);
        } else {
            log.error(authResponse.getError());
            throw new GeneralSecurityException();
        }
    }

    private void requestAccessToken(String code, HttpServletResponse response) throws IOException, GeneralSecurityException {
        try {

            GoogleTokenResponse tokenResponse =
                    new GoogleAuthorizationCodeTokenRequest(
                            new NetHttpTransport(),
                            JacksonFactory.getDefaultInstance(),
                            TOKEN_SERVER_ENCODED_URL,
                            googleProperties.getGoogleClientId(),
                            googleProperties.getGoogleClientSecret(),
                            code,
                            googleProperties.getGoogleRedirectUri())
                            .execute();


            GoogleIdToken googleIdToken = tokenResponse.parseIdToken();

            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String email = payload.getEmail();

            if (authenticate(email)) {
                tokenService.addAuthentication(response, email);
                log.debug("User logged in with email: {}", email);
            }

        } catch (TokenResponseException e) {
            if (nonNull(e.getDetails())) {
                log.error("Error: {}", e.getDetails().getError());
                if (nonNull(e.getDetails().getErrorDescription())) {
                    log.error(e.getDetails().getErrorDescription());
                }
                if (nonNull(e.getDetails().getErrorUri())) {
                    log.error(e.getDetails().getErrorUri());
                }
            } else {
                log.error(e.getMessage());
            }
        }
    }

    @Transactional(readOnly = true)
    boolean authenticate(String email) {
        Optional<User> optionalUser = userService.findByEmail(email);
        return optionalUser.isPresent();
    }
}
