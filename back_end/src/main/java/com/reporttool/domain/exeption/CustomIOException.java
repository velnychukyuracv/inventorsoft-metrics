package com.reporttool.domain.exeption;

public class CustomIOException extends RuntimeException {
    private static final String MSG = "Connection error have been occurred!!!";

    public CustomIOException(){
        super(MSG);
    }

    public CustomIOException(String message){
        super(MSG + message);
    }

    public CustomIOException(Exception e){
        super(MSG + e);
    }
}
