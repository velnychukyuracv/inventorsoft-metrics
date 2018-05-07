package com.reporttool.domain.model;

import com.reporttool.domain.service.DataSourceImplService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataSourceCredentials {

    private final DataSourceImplService dataSourceService;

    private static Map<String, DataSourceImpl> dataSources = new HashMap<>();

    @PostConstruct
    private void init() {

    }

}
