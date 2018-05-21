package com.reporttool.domain.repository;

import com.reporttool.domain.model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GroupRepository extends JpaRepository<Group, Long>{

    @Query("select max(groups.order) from Group groups")
    Integer findMaxOrderForGroups();

    Page<Group> findAllByName(String name, Pageable pageable);

}
