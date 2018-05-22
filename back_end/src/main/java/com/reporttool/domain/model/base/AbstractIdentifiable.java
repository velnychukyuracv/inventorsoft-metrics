package com.reporttool.domain.model.base;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import static javax.persistence.GenerationType.SEQUENCE;

/**
 * Base class for all application entities
 * which have unique identifier
 */
@Getter
@Setter
@MappedSuperclass
@ToString(of = "id")
public abstract class AbstractIdentifiable {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    @Column(name = "id", unique = true)
    protected Long id;
}
