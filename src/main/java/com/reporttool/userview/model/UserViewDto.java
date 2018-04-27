package com.reporttool.userview.model;

import com.reporttool.domain.constants.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserViewDto {
    private Long id;
    private String firstName;
    private String lastName;
    private Status status;
    private LocalDateTime lastSignIn;
}
