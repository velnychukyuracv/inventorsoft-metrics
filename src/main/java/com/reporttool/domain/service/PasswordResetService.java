package com.reporttool.domain.service;

import com.google.api.client.util.Lists;
import com.reporttool.config.PropertyConfig;
import com.reporttool.domain.model.PasswordResetToken;
import com.reporttool.domain.model.User;
import com.reporttool.domain.repository.PasswordResetTokenRepository;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.common.mail.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
@Slf4j
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserService userService;
    private final MailService mailService;
    private final PropertyConfig.ResetPassTokenExpirationProperties expirationProperties;

    @Transactional(readOnly = true)
    public Optional<PasswordResetToken> findById(Long tokenId) {
        return tokenRepository.findById(tokenId);
    }

    @Transactional(readOnly = true)
    public List<PasswordResetToken> findAll() {
        return Lists.newArrayList(tokenRepository.findAll());
    }

    @Transactional
    public PasswordResetToken update(PasswordResetToken token) {
        checkArgument(nonNull(token.getId()),
                "Could not update token. Entity hasn't persisted yet");
        return tokenRepository.save(token);
    }

    @Transactional
    public PasswordResetToken create(PasswordResetToken token) {
        checkArgument(isNull(token.getId()),
                "Could not create token. Entity has already exists");
        return tokenRepository.save(token);
    }

    @Transactional
    public PasswordResetToken save(PasswordResetToken token) {
        return isNull(token.getId()) ? create(token) : update(token);
    }

    @Transactional
    public void delete(PasswordResetToken token) {
        checkArgument(nonNull(token.getId()),
                "Could not delete token. Entity hasn't persisted yet");
        tokenRepository.delete(token);
    }

    @Transactional
    public void delete(Long id) {
        tokenRepository.deleteById(id);
    }
    
    

    private PasswordResetToken createToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpirationTime(LocalDateTime.now().plus(expirationProperties.getMinutesExpiration(), ChronoUnit.MINUTES));
        log.debug("Reset token for user {} was successfully created", user.getEmail());
        return resetToken;
    }

    @Transactional
    public void changeUserPassword(String token, String password) {
        PasswordResetToken passwordToken = tokenRepository.findDistinctByToken(token).orElseThrow(ResourceNotFoundException:: new);
        User user = passwordToken.getUser();
        userService.changePassword(user, password);
        delete(passwordToken);
        log.debug("Token {} was successfully deleted", token);
    }

    @Transactional
    public void createAndSendToken(String email) {
        User user = userService.findByEmail(email).orElseThrow(ResourceNotFoundException:: new);
        Optional<PasswordResetToken> optional = findById(user.getId());
        PasswordResetToken passwordResetToken;
        if (optional.isPresent()) {
            passwordResetToken = optional.get();
            LocalDateTime tokenExpiration = passwordResetToken.getExpirationTime();
            if (LocalDateTime.now().compareTo(tokenExpiration) >= 0) {
                passwordResetToken = createToken(user);
            }
        } else {
            passwordResetToken = createToken(user);
        }
        save(passwordResetToken);
        String token = passwordResetToken.getToken();
        mailService.sendResetToken(token, user);
        log.debug("Token was sent to: {}", email);
    }
}
