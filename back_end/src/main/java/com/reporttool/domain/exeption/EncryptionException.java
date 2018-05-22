package com.reporttool.domain.exeption;

import lombok.ToString;

@ToString
public class EncryptionException extends RuntimeException {
    private static final String MSG = "Problems during encryption has been encountered";

    public EncryptionException(){
        super(MSG);
    }

    public EncryptionException(String message){
        super(MSG + message);
    }

    public EncryptionException(Exception e){
        super(MSG + e);
    }
}
