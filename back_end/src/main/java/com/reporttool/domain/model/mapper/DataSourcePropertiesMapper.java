package com.reporttool.domain.model.mapper;

import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceForm;
import com.reporttool.datasources.model.DataSourceProperties;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface DataSourcePropertiesMapper {
    DataSourceDto mapToDataSourceDto(DataSourceProperties dataSourceProperties);
    DataSourceProperties mapToDataSourceProperties(DataSourceForm dataSourceForm);
    DataSourceForm mapToDataSourceForm(DataSourceProperties dataSourceProperties);
    DataSourceProperties updateDataSourceProperties(DataSourceForm form, @MappingTarget DataSourceProperties properties);
}
