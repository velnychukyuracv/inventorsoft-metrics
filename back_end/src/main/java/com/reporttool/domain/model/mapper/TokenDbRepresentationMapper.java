package com.reporttool.domain.model.mapper;

import com.reporttool.domain.model.TokenDbRepresentation;
import com.reporttool.jwttoken.model.TokenDbRepresentationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TokenDbRepresentationMapper {
    TokenDbRepresentationDto mapToTokenDbRepresentationDto(TokenDbRepresentation tokenDbRepresentation);
}
