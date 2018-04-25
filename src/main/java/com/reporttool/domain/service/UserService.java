package com.reporttool.domain.service;

import com.google.common.collect.Lists;
import com.reporttool.domain.model.User;
import com.reporttool.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;
import static org.springframework.data.domain.Sort.Direction.DESC;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User create(User user) {
        checkArgument(isNull(user.getId()),
                "Could not create entity. Entity has already exists");
        return userRepository.save(user);
    }

    public User save(User user) {
        return isNull(user.getId()) ? create(user) : update(user);
    }



    public List<User> findAll() {
        return Lists.newArrayList(userRepository.findAll());
    }

    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> findByEmail(String userEmail) {
        return userRepository.findDistinctByEmail(userEmail);
    }

    public Page<User> findUsersByName(String query, Pageable pageable) {
        return userRepository
                .findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query, pageable);
    }



    public User update(User user) {
        checkArgument(nonNull(user.getId()),
                "Could not update entity. Entity hasn't persisted yet");
        return userRepository.save(user);
    }



    public void delete(User user) {
        checkArgument(nonNull(user.getId()),
                "Could not delete entity. Entity hasn't persisted yet");
        userRepository.delete(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
