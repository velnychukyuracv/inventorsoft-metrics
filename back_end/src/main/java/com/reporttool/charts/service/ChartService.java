package com.reporttool.charts.service;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.datasources.model.DataSourceProperties;
import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.reporttool.domain.constants.ChartType;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.Chart;
import com.reporttool.domain.model.DataSourceDbRepresentation;
import com.reporttool.domain.model.mapper.ChartMapper;
import com.reporttool.domain.repository.ChartRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@Slf4j
public class ChartService extends DefaultCrudSupport<Chart> {

    private final ChartRepository chartRepository;
    private final ChartMapper chartMapper;
    private final DataSourcePropertiesService dataSourcePropService;

    @Inject
    public ChartService(
            ChartRepository chartRepository,
            ChartMapper chartMapper,
            DataSourcePropertiesService dataSourcePropService) {
        super(chartRepository);
        this.chartRepository = chartRepository;
        this.chartMapper = chartMapper;
        this.dataSourcePropService = dataSourcePropService;
    }


    public ChartForm createAndSaveChart(ChartForm form) {
        create(chartMapper.mapToChartFromChartForm(form));
        return form;
    }


    @Transactional(readOnly = true)
    public Page<ChartDto> findChartDtos(Pageable pageable) {
        return chartRepository.findAll(pageable).map(chartMapper :: mapToChartDtoFromChart);
    }

    @Transactional(readOnly = true)
    public Page<ChartDto> findChartDtosByName(String query, Pageable pageable) {
        return chartRepository.findAllByNameContainingIgnoreCaseOrderByNameAsc(query, pageable).map(chartMapper :: mapToChartDtoFromChart);
    }

    @Transactional(readOnly = true)
    public ChartDto findChartById(Long chartId) {
        return chartMapper
                .mapToChartDtoFromChart(findById(chartId)
                        .orElseThrow(ResourceNotFoundException :: new));
    }



    @Transactional
    public ChartDto updateChart(Long chartId, ChartForm form) {
        Chart chart = findById(chartId).orElseThrow(ResourceNotFoundException::new);
        chartMapper.updateChart(form, chart);
        update(chart);
        return chartMapper.mapToChartDtoFromChart(chart);
    }



    public Page<ChartDto> findChartsByGroup(Long groupId, Pageable pageable) {
        return chartRepository.findByGroup(groupId, pageable).map(chartMapper :: mapToChartDtoFromChart);
    }
}
