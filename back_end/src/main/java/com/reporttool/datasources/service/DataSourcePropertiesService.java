package com.reporttool.datasources.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reporttool.datasources.model.DataSourceDto;
import com.reporttool.datasources.model.DataSourceEditForm;
import com.reporttool.datasources.model.DataSourceForm;
import com.reporttool.datasources.model.DataSourceProperties;
import com.reporttool.domain.constants.DataSourceType;
import com.reporttool.domain.exeption.MappingException;
import com.reporttool.domain.exeption.ResourceNotFoundException;
import com.reporttool.domain.model.DataSourceDbRepresentation;
import com.reporttool.domain.model.mapper.DataSourcePropertiesMapper;
import com.reporttool.domain.repository.DataSourceDbRepresentationRepository;
import com.reporttool.domain.service.base.DefaultCrudSupport;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
public class DataSourcePropertiesService extends DefaultCrudSupport<DataSourceDbRepresentation> {

    private final DataSourcePropertiesMapper dataSourcePropertiesMapper;
    private final ObjectMapper objectMapper;
    private final CipherService cipherService;
    private final DataSourceDbRepresentationRepository dbRepresentationRepository;

    @Inject
    public DataSourcePropertiesService(
            DataSourceDbRepresentationRepository dbRepresentationRepository,
            DataSourcePropertiesMapper dataSourcePropertiesMapper,
            ObjectMapper objectMapper,
            CipherService cipherService) {
        super(dbRepresentationRepository);
        this.dbRepresentationRepository = dbRepresentationRepository;
        this.dataSourcePropertiesMapper = dataSourcePropertiesMapper;
        this.objectMapper = objectMapper;
        this.cipherService = cipherService;
    }

    /*
     * Field to store initialized DataSources
     */
    private final Map<String, AtomicReference<HikariDataSource>> dataSources = new ConcurrentHashMap<>();

    /**
     * Read from data base all stored {@link DataSource} properties
     * and initialize them
     */
    @PostConstruct
    private void init() {
        List<DataSourceProperties> dataSourceProperties = findAllDataSourceProperties();
        dataSourceProperties.forEach(a -> dataSources.put(a.getDataSourceName(), createDataSourceReference(a)));
    }

    @Transactional(readOnly = true)
    List<DataSourceProperties> findAllDataSourceProperties() {
        return mapToDataSourceForm(findAll());
    }

    @Transactional
    public DataSourceForm saveDataSource(DataSourceForm dataSourceForm) {
        DataSourceProperties dbProperties = dataSourcePropertiesMapper.mapToDataSourceProperties(dataSourceForm);
        DataSourceDbRepresentation createdDbRepresentation = create(createDbRepresentation(dbProperties));

        addDataSource(dbProperties);

        String decodedStringDbPropertiesRepresentation =
                cipherService.decrypt(createdDbRepresentation.getDataSourceObjectRepresentation());
        return dataSourcePropertiesMapper
                .mapToDataSourceForm(parseDataSourceProperties(decodedStringDbPropertiesRepresentation));
    }



    @Transactional(readOnly = true)
    public Page<DataSourceDto> findAll(Pageable pageable) {
        Page<DataSourceDbRepresentation> dbRepresentations = dbRepresentationRepository.findAll(pageable);
        return dbRepresentations.map(this::createDataSourceDto);
    }

    @Transactional(readOnly = true)
    public Page<DataSourceDto> findDataSourcesByName(String query, Pageable pageable) {
        Page<DataSourceDbRepresentation> dbRepresentations =
                dbRepresentationRepository.findAllByDataSourceNameOrderByDataSourceNameAsc(query, pageable);
        return dbRepresentations.map(this::createDataSourceDto);
    }

    @Transactional(readOnly = true)
    public DataSourceDto findDataSourceById(Long dataSourceId) {
        Optional<DataSourceDbRepresentation> dbRepresentation = findById(dataSourceId);
        if (dbRepresentation.isPresent()) {
            return createDataSourceDto(dbRepresentation.get());
        } else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public DataSourceDbRepresentation findDataSourceDbRepById(Long id) {
        return findById(id).orElseThrow(ResourceNotFoundException :: new);
    }



    @Transactional
    public DataSourceEditForm patchDataSource(Long dataSourceId, DataSourceEditForm dataSourceForm) {
        Optional<DataSourceDbRepresentation> optionalDbRepresentation = findById(dataSourceId);
        DataSourceDbRepresentation dbRepresentation =
                optionalDbRepresentation.orElseThrow(ResourceNotFoundException::new);
        String stringDataBasePropertiesRepresentation =
                cipherService.decrypt(dbRepresentation.getDataSourceObjectRepresentation());
        DataSourceProperties dbProperties =
                parseDataSourceProperties(stringDataBasePropertiesRepresentation);

        String dataSourceName = dbProperties.getDataSourceName();

        setDataSourceFields(dataSourceForm, dbProperties);

        String updatedStringDataBasePropertiesRepresentation = convertToStringRepresentation(dbProperties);

        String encryptedUpdatedStringDataBasePropertiesRepresentation =
                cipherService.encrypt(updatedStringDataBasePropertiesRepresentation);

        dbRepresentation.setDataSourceName(dbProperties.getDataSourceName());
        dbRepresentation.setDataSourceObjectRepresentation(encryptedUpdatedStringDataBasePropertiesRepresentation);

        update(dbRepresentation);

        updateDataSource(dbProperties, dataSourceName);

        log.debug("DataSourceDbRepresentation was successfully updated");
        return dataSourcePropertiesMapper.mapToDataSourceEditForm(dbProperties);
    }



    @Transactional
    public void deleteDataSource(Long dataSourceId) {
        Optional<DataSourceDbRepresentation> optionalDbRepresentation = findById(dataSourceId);
        if (optionalDbRepresentation.isPresent()) {
            delete(dataSourceId);
            deleteDataSource(optionalDbRepresentation.get().getDataSourceName());
        }
    }


    public HikariDataSource getDataSourceFromMapByName(String dataSourceName) {
        AtomicReference<HikariDataSource> reference = dataSources.get(dataSourceName);
        if (isNull(reference)) {
            log.debug("There is no data source with name {}", dataSourceName);
            throw new ResourceNotFoundException();
        }

        return reference.get();
    }

    private String convertToStringRepresentation(DataSourceProperties dataSourceProperties) {
        try {
            String stringRepresentation = objectMapper.writeValueAsString(dataSourceProperties);
            log.debug("DataSourceProperties object was successfully converted to string");
            return stringRepresentation;
        } catch (JsonProcessingException e) {
            log.warn("ObjectMapper could't convert DataSourceProperties object to string! {}", e);
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
            log.warn("ObjectMapper could't obtain DataSourceProperties object from string, IOException has occurred!!! {}", e);
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
            dbProperties.setDataSourceType(DataSourceType.valueOf(dataSourceForm.getDataSourceType()));
        }
    }

    private AtomicReference<HikariDataSource> createDataSourceReference(DataSourceProperties dbProperties) {
        AtomicReference<HikariDataSource> atomicReference = new AtomicReference<>();
        atomicReference.set(createDataSource(dbProperties));
        return atomicReference;
    }

    private HikariDataSource createDataSource(DataSourceProperties dataSourceProperties) {
        HikariConfig config = new HikariConfig();
        config.setUsername(dataSourceProperties.getUserName());
        config.setPassword(dataSourceProperties.getPassword());
        config.setJdbcUrl(dataSourceProperties.getUrl());
        config.setDriverClassName(dataSourceProperties.getDriverClassName());
        return new HikariDataSource(config);
    }

    private void addDataSource(DataSourceProperties dbProperties) {
        AtomicReference<HikariDataSource> atomicReference = new AtomicReference<>();
        atomicReference.set(createDataSource(dbProperties));
        dataSources.put(dbProperties.getDataSourceName(), atomicReference);
    }

    private void updateDataSource(DataSourceProperties dbProperties, String dataSourceName) {
        AtomicReference<HikariDataSource> atomicReference = dataSources.get(dataSourceName);
        atomicReference.get().close();
        atomicReference.set(createDataSource(dbProperties));
        dataSources.put(dbProperties.getDataSourceName(), atomicReference);
        dataSources.remove(dataSourceName);
    }

    private void deleteDataSource(String dataSourceName) {
        dataSources.get(dataSourceName).get().close();
        dataSources.remove(dataSourceName);
    }
}
