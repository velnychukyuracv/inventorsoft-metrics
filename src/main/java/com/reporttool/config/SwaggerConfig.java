package com.reporttool.config;

import com.fasterxml.classmate.TypeResolver;
import com.google.common.base.Predicates;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.DocExpansion;
import springfox.documentation.swagger.web.ModelRendering;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger.web.SecurityConfigurationBuilder;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.util.Arrays;

/**
 * TODO make it more secure.
 *
 * @see <a href="http://localhost:8080/swagger-ui.html">Swagger page</a>
 */
@Configuration
@EnableSwagger2
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SwaggerConfig {

    TypeResolver typeResolver;

    @Bean
    Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
                .paths(PathSelectors.any())
                .build()
                .pathMapping("/")
                .directModelSubstitute(LocalDate.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class)
                .alternateTypeRules(AlternateTypeRules.newRule(
                        typeResolver.resolve(
                                DeferredResult.class,
                                typeResolver.resolve(ResponseEntity.class, WildcardType.class)
                        ),
                        typeResolver.resolve(WildcardType.class)
                ))
                .useDefaultResponseMessages(false)
                .securitySchemes(Arrays.asList(new ApiKey("mykey", "api_key", "header")))
                .securityContexts(Arrays.asList(getSecurityContext()))
                .enableUrlTemplating(true);
    }

    @Bean
    SecurityConfiguration security() {
        return SecurityConfigurationBuilder.builder()
                .clientId("smart-health")
                .clientSecret("secret")
                .realm("smart-health-realm")
                .appName("smartHealth")
                .scopeSeparator(",")
                .build();
    }

    @Bean
    UiConfiguration uiConfiguration() {
        return UiConfigurationBuilder.builder()
                .defaultModelRendering(ModelRendering.of("schema"))
                .docExpansion(DocExpansion.NONE)
                .validatorUrl("validationUrl")
                .build();
    }

    private SecurityContext getSecurityContext() {
        return SecurityContext.builder()
                .securityReferences(Arrays.asList(getDefaultAuth()))
                .forPaths(PathSelectors.regex("/anyPath.*"))
                .build();
    }

    private SecurityReference getDefaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        return new SecurityReference("mykey", new AuthorizationScope[] { authorizationScope });
    }
}
