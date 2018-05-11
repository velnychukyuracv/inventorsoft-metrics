package com.reporttool.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class ReportToolUtils {
    public static Pageable createPageable(Integer page, Integer pageSize, String direction, String sortBy) {
        return PageRequest.of(page, pageSize, Sort.by(Sort.Direction.fromString(direction), sortBy));
    }
}
