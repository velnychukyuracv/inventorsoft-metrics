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
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        Optional<TokenDbRepresentation> optionalTokenDbRep = findById(user.getId());
        TokenDbRepresentation tokenDbRep;
        tokenDbRep = getTokenDbRepresentation(email, user, optionalTokenDbRep);

        userService.setUserLastSignInField(user);
        return tokenDbRepMapper.mapToTokenDbRepresentationDto(tokenDbRep);
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
            Optional<TokenDbRepresentation> optionalTokenDbRep = findById(user.getId());
            tokenDbRep = getTokenDbRepresentation(email, user, optionalTokenDbRep);
        } else {
            throw new UsernameNotFoundException("Access denied!!!");
        }
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



    @Transactional
    public TokenDbRepresentation update(TokenDbRepresentation token) {
        checkArgument(nonNull(token.getId()),
                "Could not update token. Entity hasn't persisted yet");
        return tokenDbRepRepository.save(token);
    }

    @Transactional
    public TokenDbRepresentationDto refreshToken(String jwtToken, String expirationToken) {
        TokenDbRepresentation tokenDbRep = findTokenDbRepByJwtToken(jwtToken);
        User user = userService.findById(tokenDbRep.getId()).orElseThrow(ResourceNotFoundException :: new);
        String userEmail = user.getEmail();
        if (!tokenDbRep.getExpirationToken().equals(expirationToken)) {
            log.warn("There was an attempt to receive authentication with fake expirationToken for user with email {}!!!",
                    userEmail);
            throw new BadCredentialsException("Access denied!!!");
        }
        jwtToken = createToken(userEmail);
        expirationToken = UUID.randomUUID().toString();
        tokenDbRep.setJwtToken(jwtToken);
        tokenDbRep.setExpirationToken(expirationToken);
        update(tokenDbRep);
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
            throw new CustomJwtException(e.getMessage());
        }
        return email;
    }

    private TokenDbRepresentation createTokenDbRepresentation(String email) {
        TokenDbRepresentation tokenDbRep = new TokenDbRepresentation();
        String jwtToken = createToken(email);
        String expirationToken = UUID.randomUUID().toString();
        tokenDbRep.setJwtToken(jwtToken);
        tokenDbRep.setExpirationToken(expirationToken);
        return tokenDbRep;
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

    private TokenDbRepresentation getTokenDbRepresentation(
            String email,
            User user,
            Optional<TokenDbRepresentation> optionalTokenDbRep) {

        TokenDbRepresentation tokenDbRep;
        if (optionalTokenDbRep.isPresent()) {
            tokenDbRep = optionalTokenDbRep.get();
        } else {
            tokenDbRep = createTokenDbRepresentation(email);
            tokenDbRep.setUser(user);
            create(tokenDbRep);
        }
        return tokenDbRep;
    }
}
