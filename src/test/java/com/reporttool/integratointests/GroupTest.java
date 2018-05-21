package com.reporttool.integratointests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reporttool.ApplicationStarter;
import com.reporttool.charts.model.ChartDto;
import com.reporttool.charts.model.ChartForm;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.groups.model.GroupDto;
import com.reporttool.groups.model.GroupForm;
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
public class GroupTest {
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
    public void testCreateGetPatchAndDeleteGroup() throws Exception {
        GroupForm groupForm = new GroupForm();
        groupForm.setName("Test");
        groupForm.setMaterialIcon("Material icon");


        MockHttpServletResponse response = mockMvc.perform(post(APP + "/groups")
                .header(jwtProperties.getHeaderString(), token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(groupForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        response = mockMvc.perform(get(APP + "/groups/4")
                .header(jwtProperties.getHeaderString(), token))
                .andReturn().getResponse();
        assertEquals(200, response.getStatus());

        String object = response.getContentAsString();
        GroupDto groupDto = objectMapper.readValue(object, GroupDto.class);
        assertTrue("Test".equals(groupDto.getName()));
        assertTrue("Material icon".equals(groupDto.getMaterialIcon()));
        assertTrue(4 == groupDto.getId());

        groupForm.setName("Test Name");

        response = mockMvc.perform(patch(APP + "/groups/4")
                .header(jwtProperties.getHeaderString(), token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(groupForm)))
                .andReturn().getResponse();
        assertEquals(202, response.getStatus());

        object = response.getContentAsString();
        groupDto = objectMapper.readValue(object, GroupDto.class);
        assertTrue("Test Name".equals(groupDto.getName()));

        response = mockMvc.perform(delete(APP + "/groups/4")
                .header(jwtProperties.getHeaderString(), token))
                .andReturn().getResponse();
        assertEquals(204, response.getStatus());

        response = mockMvc.perform(get(APP + "/groups/4")
                .header(jwtProperties.getHeaderString(), token))
                .andReturn().getResponse();
        assertEquals(404, response.getStatus());
    }
}
