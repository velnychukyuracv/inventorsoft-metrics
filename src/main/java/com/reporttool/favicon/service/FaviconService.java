package com.reporttool.favicon.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
public class FaviconService {
    public byte[] getFavicon() throws IOException {
        Resource resource = new ClassPathResource("images/favicon.jpeg");
        InputStream resourceInputStream = resource.getInputStream();
        return resourceInputStream.readAllBytes();
    }
}
