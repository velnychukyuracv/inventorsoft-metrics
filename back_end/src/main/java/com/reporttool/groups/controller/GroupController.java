package com.reporttool.groups.controller;

import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.service.ChartService;
import com.reporttool.groups.model.GroupDto;
import com.reporttool.groups.model.GroupForm;
import com.reporttool.groups.service.GroupService;
import com.reporttool.utils.ReportToolUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.ORDER;
import static java.util.Objects.isNull;

@RestController
@RequestMapping(APP + "/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final ChartService chartService;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public GroupForm saveGroup(@RequestBody @Validated GroupForm groupForm) {
        return groupService.saveGroup(groupForm);
    }



    @GetMapping()
    public Page<GroupDto> showGroups(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "50") Integer pageSize,
            @RequestParam(value = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(value = "sortBy", required = false, defaultValue = ORDER) String sortBy) {
        Pageable pageable = ReportToolUtils.createPageable(page, pageSize, direction, sortBy);
        if (isNull(query)) {
            return groupService.findGroupDtos(pageable);
        } else {
            return groupService.findGroupDtosByName(query, pageable);
        }
    }

    @GetMapping("/{groupId}")
    public GroupDto getGroupDto(@PathVariable("groupId") Long groupId) {
        return groupService.findGroupDto(groupId);
    }

    @GetMapping("{groupId}/charts")
    public Page<ChartDto> getChartsForGroup(@PathVariable("groupId") Long groupId,
                                            @PageableDefault Pageable pageable) {
        return chartService.findChartsByGroup(groupId, pageable);
    }



    @ResponseStatus(HttpStatus.ACCEPTED)
    @PatchMapping(value = "/{groupId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public GroupForm patchGroup(
            @RequestBody @Validated GroupForm groupForm,
            @PathVariable Long groupId) {
        return groupService.patchGroup(groupForm, groupId);
    }



    @DeleteMapping("/{groupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroup(@PathVariable Long groupId) {
        try {
            groupService.delete(groupId);
        } catch (EmptyResultDataAccessException e) {
            // we don't need to do anything as far as user doesn't exist in database
        }
    }
}
