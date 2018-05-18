package com.reporttool.charts.service;

import com.reporttool.domain.model.Chart;
import com.reporttool.domain.model.mapper.ChartMapper;
import com.reporttool.domain.repository.ChartRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
@Slf4j
public class ChartService extends DefaultCrudSupport<Chart> {

    private final ChartRepository chartRepository;
    private final ChartMapper chartMapper;

    @Inject
    public ChartService(
            ChartRepository chartRepository,
            ChartMapper chartMapper) {
        super(chartRepository);
        this.chartRepository = chartRepository;
        this.chartMapper = chartMapper;
    }
}
