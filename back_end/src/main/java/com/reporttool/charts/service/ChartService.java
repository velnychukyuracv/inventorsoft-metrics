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



    public Page<ChartDto> findChartDtos(Pageable pageable) {
        return chartRepository.findAll(pageable).map(chartMapper :: mapToChartDtoFromChart);
    }

    public Page<ChartDto> findChartDtosByName(String query, Pageable pageable) {
        return chartRepository.findAllByName(query, pageable).map(chartMapper :: mapToChartDtoFromChart);
    }

    public ChartDto findChartById(Long chartId) {
        return chartMapper
                .mapToChartDtoFromChart(findById(chartId)
                        .orElseThrow(ResourceNotFoundException :: new));
    }



    public ChartForm updateChart(Long chartId, ChartForm form) {

        Chart chart = findById(chartId).orElseThrow(ResourceNotFoundException::new);
        setChartVariable(form, chart);
        update(chart);
        return form;
    }



    private void setChartVariable(ChartForm form, Chart chart) {
        if (nonNull(form.getName())) {
            chart.setName(form.getName());
        }
        if (nonNull(form.getFilterColumns())) {
            chart.setFilterColumns(form.getFilterColumns());
        }
        if (nonNull(form.getVisibleColumns())) {
            chart.setVisibleColumns(form.getVisibleColumns());
        }
        if (nonNull(form.getType())) {
            chart.setType(ChartType.valueOf(form.getType()));
        }
        if (nonNull(form.getOrder())) {
            chart.setOrder(form.getOrder());
        }
        if (nonNull(form.getAttributes())) {
            chart.setAttributes(form.getAttributes());
        }
        if (nonNull(form.getDataSourceDbRepId())) {
            chart.setDataSourceDbRep(dataSourcePropService.
                    findById(form.getDataSourceDbRepId())
                    .orElseThrow(ResourceNotFoundException::new));
        }
    }
}
