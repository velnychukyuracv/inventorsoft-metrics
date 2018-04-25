package com.reporttool.exeption;

import lombok.Getter;
import lombok.ToString;

@ToString
public class ResourceNotFoundException extends RuntimeException{

    private static final String MSG = "Resource not found.";
    @Getter
    private static final String ERROR_PAGE = "error/notFound";

    public ResourceNotFoundException(){
        super(MSG);
    }

    public ResourceNotFoundException(String message){
        super(message);
    }
}
