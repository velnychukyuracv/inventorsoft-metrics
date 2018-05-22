package com.reporttool.sqlresponse.controller;

import com.reporttool.sqlresponse.service.SqlService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.reporttool.domain.constants.MetricConstants.APP;

@RestController
@RequestMapping(APP + "/datasource")
@AllArgsConstructor
public class SqlController {

    private final SqlService sqlService;

    @PostMapping("/{datasource_id}/query")
    public List<List<Object>> executeQuery(
            @PathVariable Long dataSourceId,
            @RequestParam(name = "sql") String sql) {
        return sqlService.executeQuery(dataSourceId, sql);
    }
}
