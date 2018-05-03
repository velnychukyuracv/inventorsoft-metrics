package com.reporttool.config.security.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AccountCredentials implements Serializable {
    private String username;
    private String password;
}
