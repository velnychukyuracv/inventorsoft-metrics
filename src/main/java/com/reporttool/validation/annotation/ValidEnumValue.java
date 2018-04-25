package com.reporttool.validation.annotation;

import com.reporttool.validation.validator.ValidEnumTypeValidator;
import org.springframework.lang.NonNull;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Check if the input value is acceptable
 * {@code enumClass must be provided}
 * Supports only simple enum with {@link String} fields
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidEnumTypeValidator.class)
@Documented
public @interface ValidEnumValue {

    @NonNull
    Class<? extends Enum> enumClass();

    String message() default "Wrong argument value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
