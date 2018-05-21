package com.reporttool.jwttoken.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenDbRepresentationDto {
    private String jwtToken;
    private String expirationToken;
}
