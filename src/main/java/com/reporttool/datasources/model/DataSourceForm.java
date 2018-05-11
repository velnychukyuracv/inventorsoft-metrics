package com.reporttool.datasources.model;

import com.reporttool.domain.constants.DataSourceType;
import com.reporttool.domain.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class DataSourceForm {
    @NotBlank
    private String dataSourceName;
    @NotBlank
    private String userName;
    @NotBlank
    private String password;
    @NotBlank
    private String url;
    @NotBlank
    private String driverClassName;
    @NotBlank
    @ValidEnumValue(enumClass = DataSourceType.class)
    private String dataSourceType;
}
