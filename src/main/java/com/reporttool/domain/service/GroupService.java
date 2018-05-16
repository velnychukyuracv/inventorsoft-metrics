package com.reporttool.domain.service;

import com.reporttool.domain.model.Group;
import com.reporttool.domain.repository.GroupRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class GroupService extends DefaultCrudSupport<Group>{

    private final GroupRepository groupRepository;

    @Inject
    public GroupService(GroupRepository groupRepository) {
        super(groupRepository);
        this.groupRepository = groupRepository;
    }
}
