package com.reporttool.config;

import com.reporttool.config.security.filter.ExceptionHandlerFilter;
import com.reporttool.config.security.filter.JWTAuthenticationFilter;
import com.reporttool.config.security.handler.RestAuthenticationEntryPoint;
import com.reporttool.config.security.service.TokenAuthenticationService;
import com.reporttool.config.security.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenAuthenticationService service;

    private final UserDetailsServiceImpl userDetailsService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .and().authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new ExceptionHandlerFilter(), CorsFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(service),
                        UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring()
                .antMatchers(HttpMethod.POST, APP + NO_AUTH + "/login")
                .antMatchers(HttpMethod.GET,APP + NO_AUTH + "/**")
                .antMatchers(HttpMethod.POST, APP + NO_AUTH + "/forgetPassword/**")
                .antMatchers(HttpMethod.GET, "/v2/api-docs/**")
                .antMatchers(HttpMethod.GET, "/swagger-resources")
                .antMatchers(HttpMethod.GET, "/swagger-ui.html")
                .antMatchers(HttpMethod.GET, "/webjars/**");
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
