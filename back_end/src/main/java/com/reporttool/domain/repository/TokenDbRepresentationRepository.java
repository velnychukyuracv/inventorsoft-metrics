package com.reporttool.domain.repository;

import com.reporttool.domain.model.TokenDbRepresentation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenDbRepresentationRepository extends JpaRepository<TokenDbRepresentation, Long> {
    Optional<TokenDbRepresentation> findDistinctByJwtToken(String jwtToken);
}
