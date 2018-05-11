package com.reporttool.domain.service;

import com.reporttool.domain.model.DataSourceDbRepresentation;
import com.reporttool.domain.repository.DataSourceDbRepresentationRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

@Service
public class DataSourceDbRepresentationService extends DefaultCrudSupport<DataSourceDbRepresentation> {

    private final DataSourceDbRepresentationRepository dbRepresentationRepository;

    @Inject
    public DataSourceDbRepresentationService(DataSourceDbRepresentationRepository dbRepresentationRepository) {
        super(dbRepresentationRepository);
        this.dbRepresentationRepository = dbRepresentationRepository;
    }

    @Transactional(readOnly = true)
    public Page<DataSourceDbRepresentation> findAll(Pageable pageable) {
        return dbRepresentationRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<DataSourceDbRepresentation> findDataSourcesByName(String query, Pageable pageable) {
        return dbRepresentationRepository.findAllByDataSourceNameOrderByDataSourceNameAsc(query, pageable);
    }
}
