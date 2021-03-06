package com.reporttool.email.model;

import lombok.Builder;
import lombok.Getter;

import java.io.File;

@Getter
@Builder
public class EmailBuilder {

    private String toEmail;
    private String fromEmail;
    private String subject;
    private String body;
    private String fileName;
    private File file;
}
