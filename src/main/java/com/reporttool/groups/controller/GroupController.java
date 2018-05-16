package com.reporttool.groups.controller;

import com.reporttool.groups.service.GroupViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;

@RestController
@RequestMapping(APP + "/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupViewService groupViewService;
}
