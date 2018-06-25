package com.reporttool.google.service;

import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.reporttool.config.PropertyConfig;
import com.reporttool.domain.exeption.CustomIOException;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.TokenDbRepresentation;
import com.reporttool.domain.model.User;
import com.reporttool.domain.model.mapper.TokenDbRepresentationMapper;
import com.reporttool.domain.service.UserService;
import com.reporttool.jwttoken.model.TokenDbRepresentationDto;
import com.reporttool.jwttoken.service.JwtTokenDbRepService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
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

    private final JwtTokenDbRepService jwtTokenDbRepService;
    private final PropertyConfig.GoogleProperties googleProperties;
    private final UserService userService;
    private final TokenDbRepresentationMapper tokenDbRepMapper;


    public String getUrl() {
        return new GoogleAuthorizationCodeRequestUrl(googleProperties.getGoogleClientId(),
                googleProperties.getGoogleRedirectUri(), Arrays.asList(
                USER_INFO_EMAIL,
                USER_INFO_PROFILE)).setState(GOOGLE_ACCOUNT_STATE).build();
    }

    public TokenDbRepresentationDto getTokenDto(StringBuffer stringBuffer) {
        AuthorizationCodeResponseUrl authResponse =
                new AuthorizationCodeResponseUrl(stringBuffer.toString());

        if (isNull(authResponse.getError())) {
            String code = authResponse.getCode();
            return requestAccessToken(code);
        } else {
            log.error("There is some trouble with google credentials!!! {}", authResponse.getError());
            throw new ResourceNotFoundException("No confirmation form Google about account!!!");
        }
    }

    private TokenDbRepresentationDto requestAccessToken(String code) {
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

            log.debug("User logging in with Google account with email: {}", email);
            return findOrCreateUserAndToken(email);

        } catch (TokenResponseException e) {
            if (nonNull(e.getDetails())) {
                log.error("Error: {}", e.getDetails().getError());
                if (nonNull(e.getDetails().getErrorDescription())) {
                    log.error(e.getDetails().getErrorDescription());
                }
                if (nonNull(e.getDetails().getErrorUri())) {
                    log.error(e.getDetails().getErrorUri());
                }
                throw new CustomIOException(e.getDetails().getError());
            } else {
                log.error(e.getMessage());
                throw new CustomIOException(e.getMessage());
            }
        } catch (IOException e) {
            log.error("Connection problem have been occurred during Google Authentication!!! {}", e);
            throw new CustomIOException();
        }
    }

    /**
     * ATTENTION!!!
     * Method for obtaining JWT token and creation of user with account in social networks
     * could be used only after social account authentication
     * @param email {@link String}
     * @return {@link TokenDbRepresentationDto}
     */
    @Transactional
    public TokenDbRepresentationDto findOrCreateUserAndToken(String email) {
        Optional<User> optionalUser = userService.findByEmail(email);
        User user;
        TokenDbRepresentation tokenDbRep;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            tokenDbRep = jwtTokenDbRepService.getTokenDbRepresentation(email, user);
        } else {
            throw new UsernameNotFoundException("Access denied!!!");
        }
        return tokenDbRepMapper.mapToTokenDbRepresentationDto(tokenDbRep);
    }
}
