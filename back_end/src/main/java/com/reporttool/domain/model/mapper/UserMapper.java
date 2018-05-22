package com.reporttool.domain.model.mapper;

import com.reporttool.domain.model.User;
import com.reporttool.userview.model.UserEditForm;
import com.reporttool.userview.model.UserSignForm;
import com.reporttool.userview.model.UserViewDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserViewDto mapToUserViewDto (User user);


    @Mapping(target = "password", ignore = true)
    UserSignForm mapToUserSignForm(User user);

    @Mapping(target = "password", ignore = true)
    User mapToUserFromSignForm(UserSignForm userSignForm);


    UserEditForm mapToUserEditForm(User user);
}
