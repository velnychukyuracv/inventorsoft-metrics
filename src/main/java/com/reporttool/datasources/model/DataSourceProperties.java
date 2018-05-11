package com.reporttool.datasources.model;

import com.reporttool.domain.constants.DataSourceType;
import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import com.reporttool.domain.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
public class DataSourceProperties {
    private String dataSourceName;
    private String userName;
    private String password;
    private String url;
    private String driverClassName;
    private DataSourceType dataSourceType;
}
