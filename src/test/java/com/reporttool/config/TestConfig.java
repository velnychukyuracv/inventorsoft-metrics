package com.reporttool.config;

import com.opentable.db.postgres.embedded.EmbeddedPostgres;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.io.IOException;

@Configuration
public class TestConfig {

    @Bean
    public DataSource dataSource() {
        EmbeddedPostgres embeddedPostgres = null;
        try {
            embeddedPostgres = EmbeddedPostgres.builder()
                    .setCleanDataDirectory(true)
                    .start();
        } catch (IOException e) {
            throw new IllegalArgumentException("Can’t initialise an embedded PostgreSQL");
        }
        HikariDataSource dataSource = new HikariDataSource();
        if (embeddedPostgres == null) {
            throw new IllegalArgumentException("Embedded PostgreSQL not initialised");
        }
        dataSource.setDataSource(embeddedPostgres.getPostgresDatabase());
        dataSource.setMinimumIdle(5);
        return dataSource;
    }
}
