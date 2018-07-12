package com.reporttool.charts.model;

import com.reporttool.domain.constants.ChartType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChartDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String name;
    private String query;
    private String filterColumns;
    private String visibleColumns;
    private ChartType type;
    private Integer order;
    private String attributes;
    private Long dataSourceDbRepId;
    private Long groupId;
}
