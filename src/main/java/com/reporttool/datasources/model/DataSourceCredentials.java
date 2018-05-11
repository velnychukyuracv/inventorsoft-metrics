package com.reporttool.datasources.model;

import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataSourceCredentials {

    private final DataSourcePropertiesService dataSourceService;

    private static Map<String, DataSource> dataSources = new HashMap<>();

//    @PostConstruct
//    private void init() {
//        List<DataSourceProperties> dataSourceProperties = dataSourceService.findAll();
//        dataSourceProperties.forEach(a -> dataSources.put(a.getDataSourceName(), createDataSource(a)));
//    }

    private DataSource createDataSource(DataSourceProperties dataSourceProperties) {
        HikariConfig config = new HikariConfig();
        config.setUsername(dataSourceProperties.getUserName());
        config.setPassword(dataSourceProperties.getPassword());
        config.setJdbcUrl(dataSourceProperties.getUrl());
        config.setDriverClassName(dataSourceProperties.getDriverClassName());
        return new HikariDataSource(config);
    }

}
