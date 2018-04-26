package com.reporttool.userview.service;

import com.reporttool.domain.model.User;
import com.reporttool.domain.model.mapper.UserMapper;
import com.reporttool.domain.service.UserService;
import com.reporttool.exeption.ResourceNotFoundException;
import com.reporttool.userview.model.UserEditForm;
import com.reporttool.userview.model.UserSignForm;
import com.reporttool.userview.model.UserViewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static java.util.Objects.nonNull;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;

@Service
@RequiredArgsConstructor
public class UserViewService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserSignForm create(UserSignForm userForm) {
        User user = userMapper.mapToUserFromSignForm(userForm);
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        User createdUser = userService.create(user);
        return userMapper.mapToUserSignForm(createdUser);
    }



    public Page<UserViewDto> getUsers(Integer page, Integer pageSize, String direction, String sortProperty) {
        Pageable pageable = createPageable(page, pageSize, direction, sortProperty);
        return userService.findAll(pageable).map(userMapper :: mapToUserViewDto);
    }

    public Optional<UserViewDto> findById(Long userId) {
        return userService.findById(userId).map(userMapper :: mapToUserViewDto);
    }

    public Page<UserViewDto> findUsersByName(
            String query,
            Integer page,
            Integer pageSize,
            String direction,
            String sortBy) {
        Pageable pageable = createPageable(page, pageSize, direction, sortBy);
        return userService.findUsersByName(query, pageable).map(userMapper :: mapToUserViewDto);
    }



    @Transactional
    public UserEditForm patchUser(Long userId, UserEditForm userForm) {
        Optional<User> optionalUser = userService.findById(userId);
        User user = optionalUser.orElseThrow(ResourceNotFoundException:: new);
        setUserFields(user, userForm);
        User updatedUser = userService.save(user);
        return userMapper.mapToUserEditForm(updatedUser);
    }



    private Pageable createPageable(Integer page, Integer pageSize, String direction, String sortBy) {
        return PageRequest.of(page, pageSize, Sort.by(Sort.Direction.fromString(direction), sortBy));
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
