package com.reporttool.userview.controller;

import com.reporttool.domain.service.UserService;
import com.reporttool.userview.model.UserEditForm;
import com.reporttool.userview.model.UserSignForm;
import com.reporttool.userview.model.UserViewDto;
import com.reporttool.userview.service.UserViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.LAST_SIGN_IN;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = APP + "/users")
public class UserViewController {

    private final UserViewService userViewService;
    private final UserService userService;

    @GetMapping()
    public Page<UserViewDto> getUsers(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                      @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize,
                                      @RequestParam(value = "direction", required = false, defaultValue = "desc") String direction,
                                      @RequestParam(value = "sortBy", required = false, defaultValue = LAST_SIGN_IN) String sortBy) {
        return userViewService.getUsers(page, pageSize, direction, sortBy);
    }

    @GetMapping("/{userId}")
    public UserViewDto getUserById(@PathVariable("userId") Long userId) {
        return userViewService.findById(userId).orElseThrow(ResourceNotFoundException:: new);
    }
    


    @PostMapping(consumes="application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public UserSignForm saveUser(@Validated @RequestBody UserSignForm userForm) {
        return userViewService.create(userForm);
    }



    @PatchMapping(path="/{userId}", consumes="application/json")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserEditForm patchUser(@PathVariable("userId") Long userId,
                                   @Validated @RequestBody UserEditForm userForm) {
        return userViewService.patchUser(userId, userForm);
    }



    @DeleteMapping("/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("userId") Long userId) {
        try {
            userService.delete(userId);
        } catch (EmptyResultDataAccessException e) {
            // we don't need to do anything as far as userview doesn't exist in database
        }
    }
}
