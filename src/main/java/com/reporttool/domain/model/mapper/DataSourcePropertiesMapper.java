package com.reporttool.domain.model.mapper;

import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceEditForm;
import com.reporttool.datasources.model.DataSourceProperties;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DataSourcePropertiesMapper {
//    @Mappings({@Mapping(target = "userName", ignore = true),
//            @Mapping(target = "password", ignore = true)})
    DataSourceDto mapToDataSourceDto(DataSourceProperties dataSourceProperties);
    DataSourceEditForm mapToDataSourceEditForm(DataSourceProperties dataSourceProperties);
}
