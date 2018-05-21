package com.reporttool.charts.controller;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.charts.service.ChartService;
import com.reporttool.domain.model.Chart;
import com.reporttool.utils.ReportToolUtils;
import lombok.RequiredArgsConstructor;
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

import java.awt.*;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.LAST_SIGN_IN;
import static java.util.Objects.isNull;
import static java.util.Objects.requireNonNull;

@RestController
@RequestMapping(APP + "/charts")
@RequiredArgsConstructor
public class ChartsController {

    private final ChartService chartService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ChartForm createChart(@RequestBody @Validated ChartForm form) {
        return chartService.createAndSaveChart(form);
    }



    @GetMapping
    public Page<ChartDto> getCharts(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize,
            @RequestParam(value = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(value = "sortBy", required = false, defaultValue = LAST_SIGN_IN) String sortBy
    ) {

        Pageable pageable = ReportToolUtils.createPageable(page, pageSize, direction, sortBy);
        if (isNull(query)) {
            return chartService.findChartDtos(pageable);
        } else {
            return chartService.findChartDtosByName(query, pageable);
        }
    }

    @GetMapping("/{chartId}")
    public ChartDto getChartById(@PathVariable Long chartId) {
        return chartService.findChartById(chartId);
    }



    @PatchMapping(value = "/{chartId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ChartForm updateChart(
            @PathVariable Long chartId,
            @RequestBody @Validated ChartForm form) {
        return chartService.updateChart(chartId, form);
    }



    @DeleteMapping("/{chartId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChart(@PathVariable Long chartId) {
        try {
            chartService.delete(chartId);
        } catch (EmptyResultDataAccessException e) {
            // we don't need to do anything as far as user doesn't exist in database
        }
    }

}
