package com.reporttool.domain.repository;

import com.reporttool.domain.model.DataSourceDbRepresentation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataSourceDbRepresentationRepository extends JpaRepository<DataSourceDbRepresentation, Long> {
    Page<DataSourceDbRepresentation> findAllByDataSourceNameOrderByDataSourceNameAsc(String query, Pageable pageable);
}
