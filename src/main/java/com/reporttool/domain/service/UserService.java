package com.reporttool.domain.service;

import com.reporttool.domain.model.User;
import com.reporttool.domain.repository.UserRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.security.InvalidParameterException;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@Slf4j
public class UserService extends DefaultCrudSupport<User>{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Inject
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        super(userRepository);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String userEmail) {
        return userRepository.findDistinctByEmail(userEmail);
    }

    @Transactional(readOnly = true)
    public Page<User> findUsersByName(String query, Pageable pageable) {
        return userRepository
                .findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query, pageable);
    }



    @Transactional
    public void changePassword(User user, String password) {
        if (nonNull(user)) {
            String newEncodedPassword = passwordEncoder.encode(password);
            user.setPassword(newEncodedPassword);
            save(user);
        } else {
            log.error("Invalid passed parameters, user: {}, password: {}", user, password);
            throw new InvalidParameterException();
        }
    }
}
