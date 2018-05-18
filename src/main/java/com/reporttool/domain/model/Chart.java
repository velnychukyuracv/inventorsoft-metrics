package com.reporttool.domain.model;

import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
//@Table(name = "charts", uniqueConstraints = @UniqueConstraint(columnNames = {"uuid"}))
@Getter
@Setter
public class Chart extends AbstractVersionalIdentifiable {
    private String name;
}
