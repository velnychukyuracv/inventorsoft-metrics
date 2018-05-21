package com.reporttool.domain.model.listener;

import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

public class AbstractVersionalIdentifiableListener {
    @PrePersist
    void onPrePersist(AbstractVersionalIdentifiable entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    void onPreUpdate(AbstractVersionalIdentifiable entity) {
        entity.setUpdatedAt(LocalDateTime.now());
    }
}
