package com.reporttool.domain.model.listener;

import com.reporttool.domain.model.base.AbstractVersional;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

public class MyEntityListener {
    @PrePersist
    void onPrePersist(AbstractVersional entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    void onPreUpdate(AbstractVersional entity) {
        entity.setUpdatedAt(LocalDateTime.now());
    }
}
