package com.reporttool.config;

import com.reporttool.config.security.filter.JWTAuthenticationFilter;
import com.reporttool.config.security.filter.JWTLoginFilter;
import com.reporttool.config.security.handler.JwtAuthenticationSuccessHandler;
import com.reporttool.config.security.handler.RestAuthenticationEntryPoint;
import com.reporttool.config.security.service.TokenAuthenticationService;
import com.reporttool.config.security.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static com.reporttool.domain.constants.MetricConstants.APP;
import static com.reporttool.domain.constants.MetricConstants.NO_AUTH;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenAuthenticationService service;

    private final UserDetailsServiceImpl userDetailsService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final PropertyConfig.CorsProperties corsProperties;

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
                .antMatchers(HttpMethod.GET,APP + NO_AUTH + "/**")
                .antMatchers(HttpMethod.GET, "/v2/api-docs/**")
                .antMatchers(HttpMethod.GET, "/swagger-resources")
                .antMatchers(HttpMethod.GET, "/swagger-ui.html")
                .antMatchers(HttpMethod.GET, "/webjars/**");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(corsProperties.getOrigins()));
        configuration.setAllowedMethods(Arrays.asList("GET"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(APP + "/**", configuration);
        return source;
    }
}
