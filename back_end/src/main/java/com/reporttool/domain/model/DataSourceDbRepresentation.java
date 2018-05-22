package com.reporttool.domain.model;

import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
        name = "data_source_representations",
        uniqueConstraints = @UniqueConstraint(columnNames = {"data_source_representation"}))
@Getter
@Setter
public class DataSourceDbRepresentation extends AbstractVersionalIdentifiable {
    @Column(name = "data_source_name")
    private String dataSourceName;
    @Column(name = "data_source_representation")
    private String dataSourceObjectRepresentation;
}
