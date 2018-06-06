package com.reporttool.domain.service;

import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.User;
import com.reporttool.domain.model.mapper.UserMapper;
import com.reporttool.domain.repository.UserRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import com.reporttool.userview.model.UserEditForm;
import com.reporttool.userview.model.UserSignForm;
import com.reporttool.userview.model.UserViewDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.security.InvalidParameterException;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.reporttool.utils.ReportToolUtils.createPageable;
import static java.util.Objects.nonNull;

@Service
@Slf4j
public class UserService extends DefaultCrudSupport<User>{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    private final static int SHORT_UUID_LENGTH = 10;

    @Inject
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserMapper userMapper) {
        super(userRepository);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }


    @Transactional
    public UserSignForm create(UserSignForm userForm) {
        User user = userMapper.mapToUserFromSignForm(userForm);
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        User createdUser = create(user);
        return userMapper.mapToUserSignForm(createdUser);
    }



    @Transactional(readOnly = true)
    public Page<UserViewDto> findUsersByName(
            String query,
            Integer page,
            Integer pageSize,
            String direction,
            String sortBy) {
        Pageable pageable = createPageable(page, pageSize, direction, sortBy);
        Page<User> users = userRepository
                .findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query, pageable);
        return users.map(userMapper :: mapToUserViewDto);
    }

    @Transactional(readOnly = true)
    public Optional<UserViewDto> findUserViewDtoById(Long userId) {
        return findById(userId).map(userMapper :: mapToUserViewDto);
    }

    @Transactional(readOnly = true)
    public Page<UserViewDto> findAll(Integer page, Integer pageSize, String direction, String sortProperty) {
        Pageable pageable = createPageable(page, pageSize, direction, sortProperty);
        return userRepository.findAll(pageable).map(userMapper :: mapToUserViewDto);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String userEmail) {
        return userRepository.findDistinctByEmail(userEmail);
    }



    @Transactional
    public UserEditForm patchUser(Long userId, UserEditForm userForm) {
        Optional<User> optionalUser = findById(userId);
        User user = optionalUser.orElseThrow(ResourceNotFoundException:: new);
        setUserFields(user, userForm);
        User updatedUser = save(user);
        return userMapper.mapToUserEditForm(updatedUser);
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

    @Transactional
    public void setUserLastSignInField(User user) {
        LocalDateTime now = LocalDateTime.now();
        user.setLastSignIn(now);
        update(user);
    }



    private void setUserFields(User user, UserEditForm userEditForm) {
        if (nonNull(userEditForm.getFirstName())) {
            user.setFirstName(userEditForm.getFirstName());
        }
        if(nonNull(userEditForm.getLastName())) {
            user.setLastName(userEditForm.getLastName());
        }
    }
}
