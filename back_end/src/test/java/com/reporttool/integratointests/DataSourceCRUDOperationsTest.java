package com.reporttool.integratointests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reporttool.ApplicationStarter;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.datasources.model.DataSourceForm;
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
import static junit.framework.TestCase.assertEquals;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ApplicationStarter.class, TestConfig.class},
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
@EnableAutoConfiguration
@ImportAutoConfiguration(MailSenderAutoConfiguration.class)
@Sql(scripts = "classpath:script.sql")
@Sql(scripts = "classpath:clean-up.sql", executionPhase = AFTER_TEST_METHOD)
@ActiveProfiles("test")
public class DataSourceCRUDOperationsTest {

    @Inject
    private WebApplicationContext context;

    @Inject
    private JwtTokenDbRepService jwtTokenDbRepService;

    @Inject
    private PropertyConfig.JWTProperties jwtProperties;

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
        token = jwtTokenDbRepService.createAndSaveTokenDbRepresentation("vasyl.pahomenko2018@gmail.com").getJwtToken();
    }

    @Test
    public void testDataSourcesSaveAndGet() throws Exception {
        DataSourceForm dataSourceForm = new DataSourceForm();
        dataSourceForm.setDataSourceName("TEST_H2_2");
        dataSourceForm.setUserName("username");
        dataSourceForm.setPassword("password");
        dataSourceForm.setUrl("jdbc:h2:mem:foo;DB_CLOSE_ON_EXIT=FALSE");
        dataSourceForm.setDriverClassName("org.h2.Driver");
        dataSourceForm.setDataSourceType("H2");

        MockHttpServletResponse response = mockMvc.perform(post(APP + "/data-sources")
                .header(jwtProperties.getHeaderString(), token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dataSourceForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        mockMvc.perform(get(APP + "/data-sources")
                .header(jwtProperties.getHeaderString(), token))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].dataSourceName").value("TEST_H2_1"))
                .andReturn();

        dataSourceForm.setDataSourceName("TEST_H2_3");
        response = mockMvc.perform(patch(APP + "/data-sources/5")
                .header(jwtProperties.getHeaderString(), token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dataSourceForm)))
                .andReturn().getResponse();
        assertEquals(202, response.getStatus());
    }

}
