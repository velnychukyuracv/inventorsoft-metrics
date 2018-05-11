package com.reporttool.integratoinaltests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.reporttool.ApplicationStarter;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.config.security.service.TokenAuthenticationService;
import com.reporttool.domain.model.PasswordResetToken;
import com.reporttool.domain.service.PasswordResetService;
import com.reporttool.userview.model.PasswordResetForm;
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
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ApplicationStarter.class, TestConfig.class},
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
@EnableAutoConfiguration
@ImportAutoConfiguration(MailSenderAutoConfiguration.class)
@Sql(scripts = "classpath:script.sql")
@Sql(scripts = "classpath:clean-up.sql", executionPhase = AFTER_TEST_METHOD)
@ActiveProfiles("dev")
public class ResetTokenTest {

    @Inject
    private WebApplicationContext context;

    @Inject
    private TokenAuthenticationService tokenService;

    @Inject
    private PasswordResetService passwordResetService;

    @Inject
    private ObjectMapper objectMapper;

    private String token;
    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
        token = tokenService.createToken("vasyl.pahomenko2018@gmail.com");
    }

    @Test
    public void testCreateAndConsumePasswordResetToken() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(post(APP + NO_AUTH + "/forgetPassword")
                .contentType(MediaType.APPLICATION_JSON)
                .param("email", "vasyl.pahomenko2018@gmail.com"))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        PasswordResetToken passwordResetToken = passwordResetService.findById(1L).orElseThrow(Exception::new);
        String token = passwordResetToken.getToken();

        PasswordResetForm passwordResetForm = new PasswordResetForm();
        passwordResetForm.setToken(token);
        passwordResetForm.setPassword("qwertyuiop12345");

        response = mockMvc.perform(post(APP + NO_AUTH + "/forgetPassword/resetPassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(passwordResetForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        response = mockMvc.perform(post(APP + NO_AUTH + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userName\":\"vasyl.pahomenko2018@gmail.com\",\"password\":\"qwertyuiop12345\"}")
                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();
        assertEquals(200, response.getStatus());
    }
}
