package com.reporttool.validation.validator;

import com.reporttool.domain.model.User;
import com.reporttool.domain.service.UserService;
import com.reporttool.validation.annotation.UniqueEmail;
import lombok.RequiredArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

@RequiredArgsConstructor
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    private final UserService userService;

    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
        /* Do nothing */
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        Optional<User> optionalUser = userService.findByEmail(email);
        return !optionalUser.isPresent();
    }
}
