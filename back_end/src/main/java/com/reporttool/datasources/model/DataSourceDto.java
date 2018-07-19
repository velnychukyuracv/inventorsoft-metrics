package com.reporttool.datasources.model;

import com.reporttool.domain.constants.DataSourceType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DataSourceDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String dataSourceName;
    private String url;
    private String driverClassName;
    private DataSourceType dataSourceType;
    private String userName;
    private String password;
}