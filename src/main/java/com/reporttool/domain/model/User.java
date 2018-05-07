package com.reporttool.domain.model;

import com.reporttool.domain.constants.Status;
import com.reporttool.domain.model.base.AbstractVersional;
import com.reporttool.domain.model.base.AbstractVersionalIdentifiable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = {"email"}),
        indexes = @Index(columnList = "email"))
@Getter
@Setter
public class User extends AbstractVersionalIdentifiable {
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column
    private String password;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "last_sign_in")
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime lastSignIn;
}
