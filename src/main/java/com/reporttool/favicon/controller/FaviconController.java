package com.reporttool.favicon.controller;

import com.reporttool.favicon.service.FaviconService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static com.reporttool.constants.MetricConstants.APP;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = APP + "/favicon.ico")
public class FaviconController {

    private final FaviconService faviconService;

    @GetMapping(produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getFavicon() throws IOException {
        return faviconService.getFavicon();
    }
}
