package com.reporttool.userview.model;

import com.reporttool.domain.constants.Status;
import com.reporttool.domain.validation.annotation.UniqueEmail;
import com.reporttool.domain.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserSignForm {
    @NotBlank
    @Size(min = 2, max = 30)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 30)
    private String lastName;

    @NotBlank
    @UniqueEmail
    @Size(min = 5, max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 30)
    private String password;

    @NotBlank
    @ValidEnumValue(enumClass = Status.class)
    private Status status;
}
