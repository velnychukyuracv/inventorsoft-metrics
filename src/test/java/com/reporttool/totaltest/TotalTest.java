package com.reporttool.totaltest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.reporttool.ApplicationStarter;
import com.reporttool.config.PropertyConfig;
import com.reporttool.config.TestConfig;
import com.reporttool.config.security.service.TokenAuthenticationService;
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
@ActiveProfiles("dev")
public class TotalTest {

    @Inject
    private WebApplicationContext context;

    @Inject
    private TokenAuthenticationService tokenService;

    @Inject
    private PropertyConfig.CorsProperties corsProperties;

    @Inject
    private PropertyConfig.JWTProperties jwtProperties;

    private String token;
    private MockMvc mockMvc;
    private ObjectMapper mapper = new ObjectMapper();

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
        mapper.registerModule(new JavaTimeModule());
        token = tokenService.createToken("bogden1979@yahoo.com");
    }

    @Test
    public void login() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(post(APP + NO_AUTH + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userName\":\"bogden1979@yahoo.com\",\"password\":\"qwerty12345\"}")
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
        userSignForm.setStatus("ACTIVE");

        MockHttpServletResponse response = mockMvc.perform(post(APP + "/users")
                .header(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(userSignForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        userSignForm.setFirstName("Vitia");
        userSignForm.setLastName("Trubkin");
        userSignForm.setEmail("gonduras@inventorsoft.co");
        userSignForm.setPassword("123456789");
        userSignForm.setStatus("ACTIVE");
        assertEquals(201, response.getStatus());

        response = mockMvc.perform(post(APP + "/users")
                .header(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(userSignForm)))
                .andReturn().getResponse();
        assertEquals(201, response.getStatus());

        mockMvc.perform(get(APP + "/users")
                .header(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + token)
                .param("sortBy", "firstName"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.content[0].firstName").value("Bogdan"))
                .andReturn();
    }

    @Test
    public void testGetUserById() throws Exception {
        String result = mockMvc.perform(get(APP + "/users/1")
                .header(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + token))
                .andReturn().getResponse().getContentAsString();
        UserViewDto user = mapper.readValue(result, new TypeReference<UserViewDto>(){});
        assertTrue("Petia".equals(user.getFirstName()));
    }

//    @Test
//    public void testSerchUserByName() throws Exception {
//        String result = mockMvc.perform(get(APP + "/search")
//                .header(jwtProperties.getHeaderstring(), jwtProperties.getTokenprefix() + " " + token)
//                .param("qu"))
//                .andReturn().getResponse().getContentAsString();
//        UserViewDto user = mapper.readValue(result, new TypeReference<UserViewDto>(){});
//        assertTrue("Petia".equals(user.getFirstName()));
//    }

//    @Test
//    public void corsTest() throws Exception {
//        mockMvc
//                .perform(get(APP + "/users")
//                .header("Access-Control-Request-Method", "GET")
//                .header("Origin", corsProperties.getOrigins())
//                .header("Authorization", token))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.header().string("Access-Control-Allow-Methods", "GET"))
//                .andExpect(content().string("application/json;charset=UTF-8"));
//    }
}
