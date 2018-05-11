package com.reporttool.domain.exeption;

import lombok.ToString;

@ToString
public class ResourceNotFoundException extends RuntimeException{

    private static final String MSG = "Resource not found.";

    public ResourceNotFoundException(){
        super(MSG);
    }

    public ResourceNotFoundException(String message){
        super(message);
    }

    public ResourceNotFoundException(Exception e){
        super(MSG + e);
    }
}
