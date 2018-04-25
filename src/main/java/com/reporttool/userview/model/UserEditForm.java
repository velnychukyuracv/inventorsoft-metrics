package com.reporttool.userview.model;

import com.reporttool.constants.Status;
import com.reporttool.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserEditForm {

    @Size(min = 2, max = 30)
    private String firstName;

    @Size(min = 2, max = 30)
    private String lastName;

    @NotBlank
    @ValidEnumValue(enumClass = Status.class)
    private Status status;
}
