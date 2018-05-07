package com.reporttool.domain.model;

import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "data_sources")
public class DataSourceImpl extends AbstractVersionalIdentifiable {
}
