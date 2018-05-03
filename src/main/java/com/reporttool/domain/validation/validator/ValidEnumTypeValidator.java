package com.reporttool.domain.validation.validator;

import com.reporttool.domain.validation.annotation.ValidEnumValue;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraintvalidation.SupportedValidationTarget;
import javax.validation.constraintvalidation.ValidationTarget;
import java.util.ArrayList;
import java.util.List;

@SupportedValidationTarget(ValidationTarget.ANNOTATED_ELEMENT)
public class ValidEnumTypeValidator implements ConstraintValidator<ValidEnumValue, String> {

    private List<String> enumValues = new ArrayList<>();

    @Override
    public void initialize(ValidEnumValue constraintAnnotation) {
        Class<? extends Enum> enumClass = constraintAnnotation.enumClass();

        Enum[] enumValArr = enumClass.getEnumConstants();

        for(Enum enumVal : enumValArr) {
            enumValues.add(enumVal.toString());
        }
    }

    @Override
    public boolean isValid(String fieldValue, ConstraintValidatorContext constraintValidatorContext) {
        return enumValues.contains(fieldValue.toUpperCase());
    }
}
