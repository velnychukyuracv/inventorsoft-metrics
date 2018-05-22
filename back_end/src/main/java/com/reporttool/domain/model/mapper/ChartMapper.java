package com.reporttool.domain.model.mapper;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.reporttool.domain.model.Chart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {DataSourcePropertiesService.class})
public interface ChartMapper {

    @Mapping(source = "dataSourceDbRepId", target = "dataSourceDbRep")
    Chart mapToChartFromChartForm(ChartForm chartForm);

    @Mapping(source = "chart.dataSourceDbRep.id", target = "dataSourceDbRepId")
    ChartDto mapToChartDtoFromChart(Chart chart);

}
