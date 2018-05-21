package com.reporttool.domain.service.base;

import com.google.common.collect.Lists;
import com.reporttool.domain.model.Group;
import com.reporttool.domain.model.base.AbstractIdentifiable;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@AllArgsConstructor
public abstract class DefaultCrudSupport<E extends AbstractIdentifiable> {

    private CrudRepository<E, Long> repository;


    @Transactional
    public E create(E entity) {
        checkArgument(isNull(entity.getId()),
                "Could not create entity. Entity has already exists");
        return repository.save(entity);
    }

    @Transactional
    public E save(E entity) {
        return isNull(entity.getId()) ? create(entity) : update(entity);
    }


    @Transactional(readOnly = true)
    public Optional<E> findById(Long entityId) {
        return repository.findById(entityId);
    }

    @Transactional(readOnly = true)
    public List<E> findAll() {
        return Lists.newArrayList(repository.findAll());
    }


    @Transactional
    public E update(E entity) {
        checkArgument(nonNull(entity.getId()),
                "Could not update entity. Entity hasn't persisted yet");
        return repository.save(entity);
    }


    @Transactional
    public void delete(E entity) {
        checkArgument(nonNull(entity.getId()),
                "Could not delete entity. Entity hasn't persisted yet");
        repository.delete(entity);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

