package com.reporttool.integratoinaltests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.reporttool.ApplicationStarter;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.config.security.service.TokenAuthenticationService;
import com.reporttool.userview.model.UserEditForm;
import com.reporttool.userview.model.UserSignForm;
import com.reporttool.userview.model.UserViewDto;
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
public class UserViewTest {

    @Inject
    private WebApplicationContext context;

    @Inject
    private TokenAuthenticationService tokenService;

    @Inject
    private PropertyConfig.JWTProperties jwtProperties;

    @Inject
    private ObjectMapper objectMapper;

    @Inject
    private PropertyConfig.CorsProperties corsProperties;

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
    public void login() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(post(APP + NO_AUTH + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userName\":\"vasyl.pahomenko2018@gmail.com\",\"password\":\"qwerty12345\"}")
                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();
        assertEquals(200, response.getStatus());
    }

    @Test
    public void testUsersSaveAndGet() throws Exception {
        UserSignForm userSignForm = new UserSignForm();

        userSignForm.setFirstName("Bogdan");
        userSignForm.setLastName("Mykhalchuk");
        userSignForm.setEmail("bogdan.mykhalchuk@inventorsoft.co");
        userSignForm.setPassword("12345678");

        MockHttpServletResponse response = mockMvc.perform(post(APP + "/users")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userSignForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        userSignForm.setFirstName("Vitia");
        userSignForm.setLastName("Trubkin");
        userSignForm.setEmail("gonduras@inventorsoft.co");
        userSignForm.setPassword("123456789");
        assertEquals(201, response.getStatus());

        response = mockMvc.perform(post(APP + "/users")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userSignForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        mockMvc.perform(get(APP + "/users")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .param("sortBy", "firstName"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.content[0].firstName").value("Bogdan"))
                .andReturn();
    }

    @Test
    public void testGetUserById() throws Exception {
        String result = mockMvc.perform(get(APP + "/users/1")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token))
                .andReturn().getResponse().getContentAsString();
        UserViewDto user = objectMapper.readValue(result, new TypeReference<UserViewDto>(){});
        assertTrue("Petia".equals(user.getFirstName()));
    }

    @Test
    public void testSearchUserByName() throws Exception {
        mockMvc.perform(get(APP + "/users")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .param("query", "Pet"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].firstName").value("Petia"))
                .andReturn();
    }

    @Test
    public void testPatchUser() throws Exception {
        UserEditForm userEditForm = new UserEditForm();

        userEditForm.setFirstName("Bogdan");
        userEditForm.setLastName("Mykhalchuk");

        MockHttpServletResponse response= mockMvc.perform(patch(APP + "/users/1")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userEditForm)))
                .andReturn().getResponse();
        assertEquals(202, response.getStatus());

        String result = mockMvc.perform(get(APP + "/users/1")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token))
                .andReturn().getResponse().getContentAsString();
        UserViewDto user = objectMapper.readValue(result, new TypeReference<UserViewDto>(){});
        assertTrue("Bogdan".equals(user.getFirstName()));
    }

    @Test
    public void testDeleteUser() throws Exception {
        MockHttpServletResponse response= mockMvc.perform(delete(APP + "/users/1")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();
        assertEquals(204, response.getStatus());

        response = mockMvc.perform(get(APP + "/users/1")
                .header(jwtProperties.getHeaderString(), jwtProperties.getTokenPrefix() + " " + token))
                .andReturn().getResponse();
        assertEquals(404, response.getStatus());
    }

    @Test
    public void corsTest() throws Exception {
        mockMvc
                .perform(get(APP + "/users")
                .header("Origin", corsProperties.getOrigins())
                .header("Authorization", token))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.header().string("Access-Control-Allow-Origin", corsProperties.getOrigins()));
    }
}
