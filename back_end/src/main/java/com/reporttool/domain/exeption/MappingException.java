package com.reporttool.domain.exeption;

public class MappingException extends RuntimeException {

    private static final String MSG = "Problems during object mapping has been encountered";

    public MappingException(){
        super(MSG);
    }

    public MappingException(String message){
        super(MSG + message);
    }

    public MappingException(Exception e){
        super(MSG + e);
    }
}
