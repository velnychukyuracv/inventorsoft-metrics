package com.reporttool.groups.service;

import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.Group;
import com.reporttool.domain.model.mapper.GroupMapper;
import com.reporttool.domain.repository.GroupRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import com.reporttool.groups.model.GroupDto;
import com.reporttool.groups.model.GroupForm;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.Optional;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
public class GroupService extends DefaultCrudSupport<Group> {

    private final GroupMapper groupMapper;

    private final GroupRepository groupRepository;

    private static int SHORT_UUID_LENGTH = 8;

    @Inject
    public GroupService(
            GroupRepository groupRepository,
            GroupMapper groupMapper) {
        super(groupRepository);
        this.groupRepository = groupRepository;
        this.groupMapper = groupMapper;
    }


    @Transactional
    public GroupForm saveGroup(GroupForm groupForm) {
        Group group = groupMapper.mapToGroupFromGroupForm(groupForm);
        group.setUuid(createShortUUID());
        Integer order = groupRepository.findMaxOrderForGroups();
        if (isNull(order)) {
            order = 1;
        } else {
            order++;
        }
        group.setOrder(order);
        create(group);

        return groupForm;
    }



    @Transactional(readOnly = true)
    public Page<GroupDto> findGroupDtos(Pageable pageable) {
        return groupRepository.findAll(pageable).map(groupMapper :: mapToGroupDtoFromGroup);
    }

    @Transactional(readOnly = true)
    public Page<GroupDto> findGroupDtosByName(String name, Pageable pageable) {
        return groupRepository.findAllByNameContainingIgnoreCaseOrderByNameAsc(name, pageable).map(groupMapper :: mapToGroupDtoFromGroup);
    }

    @Transactional(readOnly = true)
    public GroupDto findGroupDto(Long groupId) {
        return groupMapper
                .mapToGroupDtoFromGroup(findById(groupId)
                        .orElseThrow(ResourceNotFoundException::new));
    }

    @Transactional(readOnly = true)
    public Group findGroupById(Long id) {
        return findById(id).orElseThrow(ResourceNotFoundException::new);
    }



    @Transactional
    public GroupForm patchGroup(GroupForm groupForm, Long groupId) {
        Optional<Group> optionalGroup = findById(groupId);
        Group group = optionalGroup.orElseThrow(ResourceNotFoundException :: new);
        setGroupFields(groupForm, group);
        update(group);
        return groupForm;
    }




    private void setGroupFields(GroupForm groupForm, Group group) {
        if (nonNull(groupForm.getName())) {
            group.setName(groupForm.getName());
        }
        if (nonNull(groupForm.getMaterialIcon())) {
            group.setMaterialIcon(groupForm.getMaterialIcon());
        }
    }

    private String createShortUUID() {
        return RandomStringUtils.random(SHORT_UUID_LENGTH);
    }
}
