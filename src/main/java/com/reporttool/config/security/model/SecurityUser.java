package com.reporttool.config.security.model;

import com.reporttool.domain.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;

import java.util.Collections;

/**
 * Simple adapter between application's userview and spring security's
 * authentication principal. Instance of this class will be returned from
 * {@link Authentication#getPrincipal()}
 */
@Getter
@Setter
public class SecurityUser extends org.springframework.security.core.userdetails.User {

    private Long id;

    public SecurityUser(final User user) {
        super(user.getEmail(), user.getPassword(),
                Collections.emptyList());
        this.id = user.getId();
    }
}
