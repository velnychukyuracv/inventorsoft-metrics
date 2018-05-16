package com.reporttool.domain.model;

import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "groups", uniqueConstraints = @UniqueConstraint(columnNames = {"uuid"}))
@Getter
@Setter
public class Group extends AbstractVersionalIdentifiable {
    @Column(nullable = false, unique = true)
    private String uuid;
    @Column(nullable = false)
    private String name;
    @Column(name = "material_icon", nullable = false)
    private String materialIcon;
    @Column(name = "order_field", nullable = false)
    private String order;
}
