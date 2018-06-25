package com.reporttool.domain.model;

import com.reporttool.domain.constants.ChartType;
import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "charts")
@Getter
@Setter
public class Chart extends AbstractVersionalIdentifiable {
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String query;
    @Column(name = "filter_columns")
    private String filterColumns;
    @Column(name = "visible_columns", nullable = false)
    private String visibleColumns;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ChartType type;
    @Column(name = "order_field")
    private Integer order;
    @Column(nullable = false)
    private String attributes;
    @ManyToOne(optional = false)
    @JoinColumn(name = "data_source_id")
    private DataSourceDbRepresentation dataSourceDbRep;
    @ManyToOne(optional = false)
    @JoinColumn(name = "group_id")
    private Group group;
}
