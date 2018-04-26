package com.reporttool.domain.service;

import com.google.common.collect.Lists;
import com.reporttool.domain.model.User;
import com.reporttool.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User create(User user) {
        checkArgument(isNull(user.getId()),
                "Could not create entity. Entity has already exists");
        return userRepository.save(user);
    }

    @Transactional
    public User save(User user) {
        return isNull(user.getId()) ? create(user) : update(user);
    }



    @Transactional(readOnly = true)
    public List<User> findAll() {
        return Lists.newArrayList(userRepository.findAll());
    }

    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
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
    public User update(User user) {
        checkArgument(nonNull(user.getId()),
                "Could not update entity. Entity hasn't persisted yet");
        return userRepository.save(user);
    }



    @Transactional
    public void delete(User user) {
        checkArgument(nonNull(user.getId()),
                "Could not delete entity. Entity hasn't persisted yet");
        userRepository.delete(user);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
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
