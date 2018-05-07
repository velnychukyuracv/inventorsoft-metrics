package com.reporttool.domain.service;

import com.reporttool.domain.model.DataSourceImpl;
import com.reporttool.domain.repository.DataSourceImplRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
@Slf4j
public class DataSourceImplService extends DefaultCrudSupport<DataSourceImpl> {

    private final DataSourceImplRepository dataSourceRepository;

    @Inject
    public DataSourceImplService(DataSourceImplRepository dataSourceRepository) {
        super(dataSourceRepository);
        this.dataSourceRepository = dataSourceRepository;
    }
}
