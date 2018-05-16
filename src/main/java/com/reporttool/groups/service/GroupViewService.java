package com.reporttool.groups.service;

import com.reporttool.domain.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupViewService {

    private final GroupService groupService;

    private static int SHORT_UUID_LENGTH = 8;

    private String createShortUUID() {
        return RandomStringUtils.random(SHORT_UUID_LENGTH);
    }
}
