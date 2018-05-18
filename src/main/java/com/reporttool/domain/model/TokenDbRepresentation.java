package com.reporttool.domain.model;

import com.reporttool.domain.model.base.AbstractVersional;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "token_db_representation")
public class TokenDbRepresentation extends AbstractVersional {
    @Id
    private Long id;

    @NotNull
    @Column(name = "jwt_token")
    private String jwtToken;

    @NotNull
    @Column(name = "expiration_token")
    private String expirationToken;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private User user;
}
