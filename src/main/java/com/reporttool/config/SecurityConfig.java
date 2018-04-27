package com.reporttool.config;

import com.reporttool.security.filter.JWTAuthenticationFilter;
import com.reporttool.security.filter.JWTLoginFilter;
import com.reporttool.security.handler.JwtAuthenticationSuccessHandler;
import com.reporttool.security.handler.RestAuthenticationEntryPoint;
import com.reporttool.security.service.TokenAuthenticationService;
import com.reporttool.security.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.reporttool.constants.MetricConstants.APP;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenAuthenticationService service;

    private final UserDetailsServiceImpl userDetailsService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        auth.userDetailsService(userDetailsService()).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .and().authorizeRequests()
                .antMatchers(HttpMethod.POST, APP + "/login").permitAll()
                .anyRequest().authenticated()
                .and()
                // We filter the api/login requests
                .addFilterBefore(new JWTLoginFilter(APP + "/login",
                                authenticationManager(),
                                service,
                                new JwtAuthenticationSuccessHandler()),
                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(service),
                        UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring()
                .antMatchers(HttpMethod.GET,APP + "/googleAccount/login-with-google")
                .antMatchers(HttpMethod.GET,APP + "/googleAccount/oauth2callback")
                .antMatchers(HttpMethod.GET, APP + "/favicon.ico")
                .antMatchers(HttpMethod.POST, APP + "/forgetPassword")
                .antMatchers(HttpMethod.POST, APP + "/forgetPassword/resetPassword")
                                /* Swagger */
                .antMatchers(HttpMethod.GET,APP + "/v2/api-docs/**")
                .antMatchers(HttpMethod.GET,APP + "/swagger-resources")
                .antMatchers(HttpMethod.GET,APP + "/swagger-ui.html")
                .antMatchers(HttpMethod.GET,APP + "/webjars/**");
    }
}
