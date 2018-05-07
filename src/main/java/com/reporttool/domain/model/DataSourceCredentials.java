package com.reporttool.domain.model;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataSourceCredentials {

    private static Map<String, DataSource> dataSources = new HashMap<>();

    @PostConstruct
    private void init() {

    }

}
