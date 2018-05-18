package com.reporttool.charts.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;

@RestController
@RequestMapping(APP + "/charts")
@RequiredArgsConstructor
public class ChartsController {

}
