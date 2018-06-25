package com.reporttool.integratointests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reporttool.ApplicationStarter;
import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.config.security.model.AccountCredentials;
import com.reporttool.jwttoken.model.TokenDbRepresentationDto;
import com.reporttool.jwttoken.service.JwtTokenDbRepService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ApplicationStarter.class, TestConfig.class},
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
@EnableAutoConfiguration
@ImportAutoConfiguration(MailSenderAutoConfiguration.class)
@Sql(scripts = "classpath:script.sql")
@Sql(scripts = "classpath:clean-up.sql", executionPhase = AFTER_TEST_METHOD)
@ActiveProfiles("test")
public class RefreshTokenTest {
    @Inject
    private WebApplicationContext context;

    @Inject
    private PropertyConfig.JWTProperties jwtProperties;

    @Inject
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    public void testGetRefreshToken() throws Exception {
        AccountCredentials credentials = new AccountCredentials();
        credentials.setUserName("vasyl.pahomenko2018@gmail.com");
        credentials.setPassword("qwerty12345");
        MockHttpServletResponse response = mockMvc.perform(post(APP + NO_AUTH + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(credentials)))
                .andReturn().getResponse();
        assertEquals(200, response.getStatus());

        TokenDbRepresentationDto tokenDto =
                objectMapper.readValue(response.getContentAsString(), TokenDbRepresentationDto.class);
        String jwtToken = tokenDto.getJwtToken();
        String expirationToken = tokenDto.getExpirationToken();

        Thread.sleep(6000);

        response = mockMvc.perform(post(APP + NO_AUTH + "/refresh-token")
                .header(jwtProperties.getHeaderString(), jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(expirationToken))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        tokenDto =
                objectMapper.readValue(response.getContentAsString(), TokenDbRepresentationDto.class);
    }
}
