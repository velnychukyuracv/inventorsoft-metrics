package com.reporttool.config.security.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
public class AccountCredentials implements Serializable {

    @NotBlank
    @Email
    private String userName;

    @NotBlank
    @Size(min = 8, max = 30)
    private String password;
}
