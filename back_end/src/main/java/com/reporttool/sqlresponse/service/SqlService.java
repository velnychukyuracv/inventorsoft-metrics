package com.reporttool.sqlresponse.service;

import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.DataSourceDbRepresentation;
import com.reporttool.sqlresponse.mapper.ObjectExtractor;
import com.zaxxer.hikari.HikariDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class SqlService {

    private final DataSourcePropertiesService dataSourcePropertiesService;
    private final ObjectExtractor objectExtractor;

    public List<List<Object>> executeQuery(Long dataSourceId, String sql) {
        DataSourceDbRepresentation dataSourceDbRep = dataSourcePropertiesService
                .findById(dataSourceId)
                .orElseThrow(() -> logAndThrowException(dataSourceId));
        String dataSourceName = dataSourceDbRep.getDataSourceName();
        HikariDataSource dataSource = dataSourcePropertiesService.getDataSourceFromMapByName(dataSourceName);
        JdbcTemplate template = new JdbcTemplate(dataSource);
        return template.query(sql, objectExtractor);
    }

    private ResourceNotFoundException logAndThrowException(Long dataSourceId) {
        log.debug("There is no datasource with id {}", dataSourceId);
        return new ResourceNotFoundException("There is no datasource with id: " + dataSourceId);
    }
}
