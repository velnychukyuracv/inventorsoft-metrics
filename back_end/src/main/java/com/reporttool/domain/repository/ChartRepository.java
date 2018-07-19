package com.reporttool.domain.repository;

import com.reporttool.domain.model.Chart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChartRepository extends JpaRepository<Chart, Long>{
    Page<Chart> findAllByNameContainingIgnoreCaseOrderByNameAsc(String name, Pageable pageable);
    @Query("Select c from Chart c where c.group.id = :groupId")
    Page<Chart> findByGroup(@Param("groupId") Long groupId, Pageable pageable);
}
