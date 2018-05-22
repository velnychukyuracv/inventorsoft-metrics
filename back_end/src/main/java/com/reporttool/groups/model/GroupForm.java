package com.reporttool.groups.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class GroupForm {
    @NotBlank
    private String name;
    @NotBlank
    private String materialIcon;
}
