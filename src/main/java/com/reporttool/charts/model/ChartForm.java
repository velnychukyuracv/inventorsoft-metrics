package com.reporttool.charts.model;

import com.reporttool.domain.constants.ChartType;
import com.reporttool.domain.validation.annotation.ValidEnumValue;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class ChartForm {
    @NotBlank
    private String name;
    @NotBlank
    private String query;
    private String filterColumns;
    @NotBlank
    private String visibleColumns;
    @NotBlank
    @ValidEnumValue(enumClass = ChartType.class)
    private String type;
    @NotNull
    @Digits(integer = 5, fraction = 0)
    private Integer order;
    @NotBlank
    private String attributes;
    @NotNull
    @Digits(integer = 5, fraction = 0)
    private Long dataSourceDbRepId;
}
