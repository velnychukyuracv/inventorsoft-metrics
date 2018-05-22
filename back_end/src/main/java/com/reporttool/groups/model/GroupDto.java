package com.reporttool.groups.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GroupDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String uuid;
    private String name;
    private String materialIcon;
    private Integer order;
}
