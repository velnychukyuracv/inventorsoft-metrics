package com.reporttool.datasources.controller;

import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceEditForm;
import com.reporttool.datasources.model.DataSourceProperties;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.reporttool.utils.ReportToolUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.DATA_SOURCE_NAME;
import static java.util.Objects.nonNull;
import static org.apache.commons.lang3.StringUtils.isEmpty;

@RestController
@RequiredArgsConstructor
@RequestMapping(APP + "/data-sources")
public class DataSourceController {

    private final DataSourcePropertiesService dataSourcePropertiesService;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public DataSourceProperties saveDataSource(@RequestBody @Validated DataSourceProperties dataSourceProperties) {
        return dataSourcePropertiesService.saveDataSource(dataSourceProperties);
    }



    @GetMapping()
    public Page<DataSourceDto> getDataSources(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize,
            @RequestParam(value = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(value = "sortBy", required = false, defaultValue = DATA_SOURCE_NAME) String sortBy) {
        Pageable pageable = ReportToolUtils.createPageable(page, pageSize, direction, sortBy);
        if (isEmpty(query)) {
            return dataSourcePropertiesService.findAll(pageable);
        } else {
            return dataSourcePropertiesService.findDataSourcesByName(query, pageable);
        }
    }

    @GetMapping("/{dataSourceId}")
    public DataSourceDto getDataSourceById(@PathVariable("dataSourceId") Long dataSourceId) {
        DataSourceDto dataSourceForm = dataSourcePropertiesService.findDataSourceById(dataSourceId);
        if (nonNull(dataSourceForm)) {
            return dataSourceForm;
        } else {
            throw new ResourceNotFoundException();
        }
    }



    @PatchMapping(path = "/{dataSourceId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DataSourceEditForm patchDataSource(@PathVariable("dataSourceId") Long dataSourceId,
                                          @RequestBody @Validated DataSourceEditForm dataSourceForm) {
        return dataSourcePropertiesService.patchDataSource(dataSourceId, dataSourceForm);
    }



    @DeleteMapping("/{dataSourceId")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDataSource(@PathVariable("dataSourceId") Long dataSourceId) {
        try {
            dataSourcePropertiesService.deleteDataSource(dataSourceId);
        } catch (EmptyResultDataAccessException e) {
            // we don't need to do anything as far as data source doesn't exist in database
        }
    }
}
