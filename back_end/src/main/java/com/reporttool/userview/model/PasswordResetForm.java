package com.reporttool.userview.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class PasswordResetForm {
    @NotBlank
    private String token;
    @NotBlank
    @Size(min = 8, max = 30)
    private String password;
}
