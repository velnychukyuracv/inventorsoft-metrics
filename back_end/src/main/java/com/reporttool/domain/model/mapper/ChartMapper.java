package com.reporttool.domain.model.mapper;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.datasources.service.DataSourcePropertiesService;
import com.reporttool.domain.model.Chart;
import com.reporttool.groups.service.GroupService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {DataSourcePropertiesService.class, GroupService.class})
public interface ChartMapper {

    @Mappings({
            @Mapping(source = "dataSourceDbRepId", target = "dataSourceDbRep"),
            @Mapping(source = "groupId", target = "group")
    })
    Chart mapToChartFromChartForm(ChartForm chartForm);

    @Mapping(source = "chart.dataSourceDbRep.id", target = "dataSourceDbRepId")
    ChartDto mapToChartDtoFromChart(Chart chart);

}
