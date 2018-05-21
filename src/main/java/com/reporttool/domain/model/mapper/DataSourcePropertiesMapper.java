package com.reporttool.domain.model.mapper;

import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceEditForm;
import com.reporttool.datasources.model.DataSourceForm;
import com.reporttool.datasources.model.DataSourceProperties;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DataSourcePropertiesMapper {
    DataSourceDto mapToDataSourceDto(DataSourceProperties dataSourceProperties);
    DataSourceEditForm mapToDataSourceEditForm(DataSourceProperties dataSourceProperties);
    DataSourceProperties mapToDataSourceProperties(DataSourceForm dataSourceForm);
    DataSourceForm mapToDataSourceForm(DataSourceProperties dataSourceProperties);
}
