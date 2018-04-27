package com.reporttool.search.controller;

import com.reporttool.userview.model.UserViewDto;
import com.reporttool.userview.service.UserViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.constants.MetricConstants.APP;
import static com.reporttool.constants.MetricConstants.LAST_SIGN_IN;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = APP + "/search")
public class SearchController {

    private final UserViewService userViewService;

    @GetMapping()
    public Page<UserViewDto> searchUserByName(
            @RequestParam(value = "query") String query,
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize,
            @RequestParam(value = "direction", required = false, defaultValue = "desc") String direction,
            @RequestParam(value = "sortBy", required = false, defaultValue = LAST_SIGN_IN) String sortBy) {

        return userViewService.findUsersByName(query, page, pageSize, direction, sortBy);
    }
}
