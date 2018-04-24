package com.reporttool.domain.service;

import com.google.common.collect.Lists;
import com.reporttool.domain.User;
import com.reporttool.domain.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Inject
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }



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

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> findByEmail(String userEmail) {
        Optional<User> user = userRepository.findDistinctByEmail(userEmail);
        return user;
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
