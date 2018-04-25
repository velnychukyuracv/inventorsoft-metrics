package com.reporttool.favicon.controller;

import com.reporttool.favicon.service.FaviconService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FaviconController {

    private final FaviconService faviconService;

    @GetMapping(value = "/favicon.ico", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getFavicon() throws IOException {
        return faviconService.getFavicon();
    }
}
