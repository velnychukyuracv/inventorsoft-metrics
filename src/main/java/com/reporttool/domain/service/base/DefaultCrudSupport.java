package com.reporttool.domain.service.base;

import com.google.common.collect.Lists;
import com.reporttool.domain.model.base.AbstractIdentifiable;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@AllArgsConstructor
public abstract class DefaultCrudSupport<E extends AbstractIdentifiable> {

    private JpaRepository<E, Long> repository;

    public Optional<E> findById(Long entityId) {
        return repository.findById(entityId);
    }

    public List<E> findAll() {
        return Lists.newArrayList(repository.findAll());
    }

    public E update(E entity) {
        checkArgument(nonNull(entity.getId()),
                "Could not update entity. Entity hasn't persisted yet");
        return repository.save(entity);
    }

    public E create(E entity) {
        checkArgument(isNull(entity.getId()),
                "Could not create entity. Entity has already exists");
        return repository.save(entity);
    }

    public E save(E entity) {
        return isNull(entity.getId()) ? create(entity) : update(entity);
    }

    public void delete(E entity) {
        checkArgument(nonNull(entity.getId()),
                "Could not delete entity. Entity hasn't persisted yet");
        repository.delete(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

