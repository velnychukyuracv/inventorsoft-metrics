package com.reporttool.userview.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserViewDto {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDateTime lastSignIn;
}
