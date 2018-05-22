package com.reporttool.domain.repository;

import com.reporttool.domain.model.Chart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<Chart, Long>{
    Page<Chart> findAllByName(String name, Pageable pageable);
}
