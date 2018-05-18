package com.reporttool.domain.repository;

import com.reporttool.domain.model.Chart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<Chart, Long>{
}
