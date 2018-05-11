package com.reporttool.datasources.model;

import com.reporttool.domain.constants.DataSourceType;
import com.reporttool.domain.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataSourceEditForm {
    private String dataSourceName;
    private String url;
    private String driverClassName;
    @ValidEnumValue(enumClass = DataSourceType.class)
    private DataSourceType dataSourceType;
}
