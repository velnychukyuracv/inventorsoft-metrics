package com.reporttool.domain.model.mapper;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.domain.model.Chart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChartMapper {
    Chart mapToChartFromChartForm(ChartForm chartForm);
    ChartDto mapToChartDtoFromChart(Chart chart);
}
