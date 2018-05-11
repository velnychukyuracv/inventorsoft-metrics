package com.reporttool.datasources.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceEditForm;
import com.reporttool.datasources.model.DataSourceForm;
import com.reporttool.datasources.model.DataSourceProperties;
import com.reporttool.domain.exeption.MappingException;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.DataSourceDbRepresentation;
import com.reporttool.domain.model.mapper.DataSourcePropertiesMapper;
import com.reporttool.domain.service.DataSourceDbRepresentationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class DataSourcePropertiesService {

    private final DataSourcePropertiesMapper dataSourcePropertiesMapper;
    private final DataSourceDbRepresentationService dbRepresentationService;
    private final ObjectMapper objectMapper;
    private final CipherService cipherService;



    public DataSourceForm saveDataSource(DataSourceForm dataSourceForm) {
        DataSourceProperties dbProperties = dataSourcePropertiesMapper.mapToDataSourceProperties(dataSourceForm);
        DataSourceDbRepresentation createdDbRepresentation =
                dbRepresentationService.create(createDbRepresentation(dbProperties));
        String decodedStringDbPropertiesRepresentation =
                cipherService.decrypt(createdDbRepresentation.getDataSourceObjectRepresentation());
        return dataSourcePropertiesMapper
                .mapToDataSourceForm(parseDataSourceProperties(decodedStringDbPropertiesRepresentation));
    }




    public List<DataSourceProperties> findAll() {
        return mapToDataSourceForm(dbRepresentationService.findAll());
    }

    public Page<DataSourceDto> findAll(Pageable pageable) {
        Page<DataSourceDbRepresentation> dbRepresentations = dbRepresentationService.findAll(pageable);
        return dbRepresentations.map(this::createDataSourceDto);
    }

    public Page<DataSourceDto> findDataSourcesByName(String query, Pageable pageable) {
        Page<DataSourceDbRepresentation> dbRepresentations =
                dbRepresentationService.findDataSourcesByName(query, pageable);
        return dbRepresentations.map(this::createDataSourceDto);
    }

    public DataSourceDto findDataSourceById(Long dataSourceId) {
        Optional<DataSourceDbRepresentation> dbRepresentation = dbRepresentationService.findById(dataSourceId);
        if (dbRepresentation.isPresent()) {
            return createDataSourceDto(dbRepresentation.get());
        } else {
            return null;
        }
    }



    @Transactional
    public DataSourceEditForm patchDataSource(Long dataSourceId, DataSourceEditForm dataSourceForm) {
        Optional<DataSourceDbRepresentation> optionalDbRepresentation = dbRepresentationService.findById(dataSourceId);
        DataSourceDbRepresentation dbRepresentation =
                optionalDbRepresentation.orElseThrow(ResourceNotFoundException::new);
        String stringDataBasePropertiesRepresentation =
                cipherService.decrypt(dbRepresentation.getDataSourceObjectRepresentation());
        DataSourceProperties dbProperties =
                parseDataSourceProperties(stringDataBasePropertiesRepresentation);

        setDataSourceFields(dataSourceForm, dbProperties);

        String updatedStringDataBasePropertiesRepresentation = convertToStringRepresentation(dbProperties);

        String encryptedUpdatedStringDataBasePropertiesRepresentation =
                cipherService.encrypt(updatedStringDataBasePropertiesRepresentation);

        dbRepresentation.setDataSourceObjectRepresentation(encryptedUpdatedStringDataBasePropertiesRepresentation);

        dbRepresentationService.update(dbRepresentation);
        log.debug("DataSourceDbRepresentation was successfully updated");
        return dataSourcePropertiesMapper.mapToDataSourceEditForm(dbProperties);
    }



    public void deleteDataSource(Long dataSourceId) {
        dbRepresentationService.delete(dataSourceId);
    }



    private String convertToStringRepresentation(DataSourceProperties dataSourceProperties) {
        try {
            String stringRepresentation = objectMapper.writeValueAsString(dataSourceProperties);
            log.debug("DataSourceProperties object was successfully converted to string");
            return stringRepresentation;
        } catch (JsonProcessingException e) {
            log.warn("ObjectMapper could't convert object to string, JsonProcessingException has occurred");
            throw new MappingException(e);
        }
    }

    private List<DataSourceProperties> mapToDataSourceForm(List<DataSourceDbRepresentation> dbRepresentations) {
        return dbRepresentations.stream()
                .map(DataSourceDbRepresentation::getDataSourceObjectRepresentation)
                .map(cipherService::decrypt)
                .map(this::parseDataSourceProperties)
                .collect(Collectors.toList());
    }

    private DataSourceDto createDataSourceDto(DataSourceDbRepresentation dbRepresentation) {
        String dataSourcePropertiesStringRepresentation =
                cipherService.decrypt(dbRepresentation.getDataSourceObjectRepresentation());
        DataSourceProperties dataSourceProperties = parseDataSourceProperties(dataSourcePropertiesStringRepresentation);
        DataSourceDto dataSourceDto = dataSourcePropertiesMapper.mapToDataSourceDto(dataSourceProperties);
        dataSourceDto.setId(dbRepresentation.getId());
        dataSourceDto.setCreatedAt(dbRepresentation.getCreatedAt());
        dataSourceDto.setUpdatedAt(dbRepresentation.getUpdatedAt());
        log.debug("DataSouceDto object was successfully created");
        return dataSourceDto;
    }

    private DataSourceDbRepresentation createDbRepresentation(DataSourceProperties dbProperties) {
        DataSourceDbRepresentation dbRepresentation = new DataSourceDbRepresentation();
        dbRepresentation.setDataSourceName(dbProperties.getDataSourceName());
        String stringedDb = convertToStringRepresentation(dbProperties);
        dbRepresentation.setDataSourceObjectRepresentation(cipherService.encrypt(stringedDb));
        log.debug("DataSourceDbRepresentation was successfully created");
        return dbRepresentation;
    }

    private DataSourceProperties parseDataSourceProperties(String dataSourcePropertiesStringRepresentation) {
        try {
            DataSourceProperties dbProperties =
                    objectMapper.readValue(dataSourcePropertiesStringRepresentation, DataSourceProperties.class);
            log.debug("String was successfully converted to DataSourceProperties object");
            return dbProperties;
        } catch (IOException e) {
            log.warn("ObjectMapper could't obtain DataSourceProperties object from string, IOException has occurred");
            throw new MappingException(e);
        }
    }

    private void setDataSourceFields(DataSourceEditForm dataSourceForm, DataSourceProperties dbProperties) {
        if (nonNull(dataSourceForm.getDataSourceName())) {
            dbProperties.setDataSourceName(dataSourceForm.getDataSourceName());
        }
        if (nonNull(dataSourceForm.getUrl())) {
            dbProperties.setUrl(dataSourceForm.getUrl());
        }
        if (nonNull(dataSourceForm.getDriverClassName())) {
            dbProperties.setDriverClassName(dataSourceForm.getDriverClassName());
        }
        if (nonNull(dataSourceForm.getDataSourceType())) {
            dbProperties.setDataSourceType(dataSourceForm.getDataSourceType());
        }
    }
}
