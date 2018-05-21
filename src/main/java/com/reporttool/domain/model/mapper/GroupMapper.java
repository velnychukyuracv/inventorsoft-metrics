package com.reporttool.domain.model.mapper;

import com.reporttool.domain.model.Group;
import com.reporttool.groups.model.GroupDto;
import com.reporttool.groups.model.GroupForm;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group mapToGroupFromGroupForm(GroupForm groupForm);
    GroupDto mapToGroupDtoFromGroup(Group group);
}
