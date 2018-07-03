package com.reporttool.jwttoken.service;

import com.google.api.client.util.Lists;
import com.reporttool.config.PropertyConfig;
import com.reporttool.domain.exeption.CustomJwtException;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.TokenDbRepresentation;
import com.reporttool.domain.model.User;
import com.reporttool.domain.model.mapper.TokenDbRepresentationMapper;
import com.reporttool.domain.repository.TokenDbRepresentationRepository;
import com.reporttool.domain.service.UserService;
import com.reporttool.jwttoken.model.TokenDbRepresentationDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtTokenDbRepService {

    private final UserService userService;
    private final TokenDbRepresentationRepository tokenDbRepRepository;
    private final TokenDbRepresentationMapper tokenDbRepMapper;
    private final PropertyConfig.JWTProperties jwtProperties;

    @Transactional
    public TokenDbRepresentation create(TokenDbRepresentation token) {
        checkArgument(isNull(token.getId()),
                "Could not create token. Entity has already exists");
        return tokenDbRepRepository.save(token);
    }

    @Transactional
    public TokenDbRepresentation save(TokenDbRepresentation token) {
        return isNull(token.getId()) ? create(token) : update(token);
    }

    @Transactional
    public TokenDbRepresentationDto createAndSaveTokenDbRepresentation(String email) {
        Optional<User> optionalUser = userService.findByEmail(email);
        User user = optionalUser.orElseThrow(ResourceNotFoundException::new);
        TokenDbRepresentation tokenDbRep = getTokenDbRepresentation(email, user);

        userService.setUserLastSignInField(user);
        return tokenDbRepMapper.mapToTokenDbRepresentationDto(tokenDbRep);
    }



    @Transactional(readOnly = true)
    public Optional<TokenDbRepresentation> findById(Long tokenId) {
        return tokenDbRepRepository.findById(tokenId);
    }

    @Transactional(readOnly = true)
    public List<TokenDbRepresentation> findAll() {
        return Lists.newArrayList(tokenDbRepRepository.findAll());
    }

    @Transactional(readOnly = true)
    public TokenDbRepresentation findTokenDbRepByJwtToken(String jwtToken) {
        Optional<TokenDbRepresentation> optionalTokenDbRep = tokenDbRepRepository.findDistinctByJwtToken(jwtToken);
        return optionalTokenDbRep.orElseThrow(ResourceNotFoundException::new);
    }
    @Transactional(readOnly = true)
    public TokenDbRepresentation findTokenDbRepByExpirationToken(String expirationToken) {
        Optional<TokenDbRepresentation> optionalTokenDbRep =
                tokenDbRepRepository.findDistinctByExpirationToken(expirationToken);
        return optionalTokenDbRep.orElseThrow(ResourceNotFoundException::new);
    }



    @Transactional
    public TokenDbRepresentation update(TokenDbRepresentation token) {
        checkArgument(nonNull(token.getId()),
                "Could not update token. Entity hasn't persisted yet");
        return tokenDbRepRepository.save(token);
    }

    @Transactional
    public TokenDbRepresentationDto refreshToken(String expiredJwtToken, String expirationToken) {
        TokenDbRepresentation tokenDbRep = findTokenDbRepByExpirationToken(expirationToken);
        User user = userService.findById(tokenDbRep.getId()).orElseThrow(ResourceNotFoundException :: new);
        String userEmail = user.getEmail();

        // checks if the expired JWT token is valid
        try {
            parseToken(expiredJwtToken);
        } catch (CustomJwtException e) {
            if (e.getException() instanceof ExpiredJwtException) {
                // do nothing because this is valid, but expired jwt token
            } else {
                log.warn("There was an attempt to receive authentication with fake expirationToken for user with email {}!!!",
                        userEmail);
                throw new BadCredentialsException("Access denied!!!");
            }
        }

        String newJwtToken = tokenDbRep.getJwtToken();

        //checks if saved in data base JWT token is valid and not expired
        try {
            parseToken(newJwtToken);
        } catch (CustomJwtException e) {
            newJwtToken = createToken(userEmail);
            tokenDbRep.setJwtToken(newJwtToken);
            tokenDbRep = update(tokenDbRep);
        }
        userService.setUserLastSignInField(tokenDbRep.getUser());
        return tokenDbRepMapper.mapToTokenDbRepresentationDto(tokenDbRep);
    }



    @Transactional
    public void delete(TokenDbRepresentation token) {
        checkArgument(nonNull(token.getId()),
                "Could not delete token. Entity hasn't persisted yet");
        tokenDbRepRepository.delete(token);
    }

    @Transactional
    public void delete(Long id) {
        tokenDbRepRepository.deleteById(id);
    }



    public String parseToken(String token) {
        String email;
        try {
            email = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret())
                    .parseClaimsJws(token.replace(jwtProperties.getTokenPrefix(), ""))
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            log.warn("Exception had occurred during JWT token parsing! {}", e);
            throw new CustomJwtException(e.getMessage(), e);
        }
        return email;
    }

    @Transactional
    TokenDbRepresentation createNewTokenDbRepresentation(String email, User user) {
        TokenDbRepresentation tokenDbRep = new TokenDbRepresentation();
        String jwtToken = createToken(email);
        String expirationToken = UUID.randomUUID().toString();
        tokenDbRep.setJwtToken(jwtToken);
        tokenDbRep.setExpirationToken(expirationToken);
        tokenDbRep.setUser(user);
        return create(tokenDbRep);
    }

    private String createToken(String userName) {
        String token = jwtProperties.getTokenPrefix() + " " + Jwts.builder()
                .setSubject(userName)
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
        log.debug("Token was created for user: {}", userName);
        return token;
    }

    @Transactional
    TokenDbRepresentation refreshTokenDbRep(TokenDbRepresentation tokenDbRep, String email) {
        String jwtToken = createToken(email);
        tokenDbRep.setJwtToken(jwtToken);
        return update(tokenDbRep);
    }

    public TokenDbRepresentation getTokenDbRepresentation(
            String email,
            User user) {
        Optional<TokenDbRepresentation> optionalTokenDbRep = findById(user.getId());
        TokenDbRepresentation tokenDbRep;
        if (optionalTokenDbRep.isPresent()) {
            tokenDbRep = optionalTokenDbRep.get();
            tokenDbRep = refreshTokenDbRep(tokenDbRep, email);
        } else {
            tokenDbRep = createNewTokenDbRepresentation(email, user);
        }
        return tokenDbRep;
    }
}