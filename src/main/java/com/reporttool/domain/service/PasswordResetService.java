package com.reporttool.domain.service;

import com.google.api.client.util.Lists;
import com.reporttool.domain.model.PasswordResetToken;
import com.reporttool.domain.model.User;
import com.reporttool.domain.repository.PasswordResetTokenRepository;
import com.reporttool.exeption.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private static final int HOURS = 2;

    private final PasswordResetTokenRepository tokenRepository;
    private final UserService userService;

    public Optional<PasswordResetToken> findById(Long tokenId) {
        return tokenRepository.findById(tokenId);
    }

    public List<PasswordResetToken> findAll() {
        return Lists.newArrayList(tokenRepository.findAll());
    }

    public PasswordResetToken update(PasswordResetToken token) {
        checkArgument(nonNull(token.getId()),
                "Could not update token. Entity hasn't persisted yet");
        return tokenRepository.save(token);
    }

    public PasswordResetToken create(PasswordResetToken token) {
        checkArgument(isNull(token.getId()),
                "Could not create token. Entity has already exists");
        return tokenRepository.save(token);
    }

    public PasswordResetToken save(PasswordResetToken token) {
        return isNull(token.getId()) ? create(token) : update(token);
    }

    public void delete(PasswordResetToken token) {
        checkArgument(nonNull(token.getId()),
                "Could not delete token. Entity hasn't persisted yet");
        tokenRepository.delete(token);
    }

    public void delete(Long id) {
        tokenRepository.deleteById(id);
    }
    
    
    
    public PasswordResetToken createToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpirationTime(LocalDateTime.now().plusHours(HOURS));
        return save(resetToken);
    }

    public void changeUserPassword(String token, String password) {
        PasswordResetToken passwordToken = tokenRepository.findDistinctByToken(token).orElseThrow(ResourceNotFoundException:: new);
        User user = passwordToken.getUser();
        userService.changePassword(user, password);
        delete(passwordToken);
    }
}
