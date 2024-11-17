package com.example.demo.config;

import com.example.demo.exception.BaseException;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

import static com.example.demo.exception.BatchErrorType.GENERIC_ERROR;

@Configuration
@EnableTransactionManagement
public class BatchDataSourcesConfiguration {
    @Bean("batchConfig")
    @Primary
    @ConfigurationProperties("spring.datasource.batch")
    public HikariConfig appHikariConfig() {
        return new HikariConfig();
    }

    @Bean("dataSource")
    @Primary
    public HikariDataSource appDataSource(@Qualifier("batchConfig") HikariConfig hikariConfig) {
        return new HikariDataSource(hikariConfig);
    }

    @Bean(name = "entityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(
        @Autowired EntityManagerFactoryBuilder builder,
        @Qualifier("dataSource") DataSource batchDataSource) {
        return builder
                .dataSource(batchDataSource)
                .packages("com.example.demo.data.batch")
                .build();
    }

    @Bean("transactionManager")
    @Primary
    public PlatformTransactionManager platformTransactionManager(
            @Qualifier("entityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactoryBean)
            throws BaseException {
        if (entityManagerFactoryBean == null) {
            throw new BaseException(GENERIC_ERROR);
        } else {
            EntityManagerFactory emf = entityManagerFactoryBean.getObject();
            if (emf == null) {
                throw new BaseException(GENERIC_ERROR);
            } else {
                return new JpaTransactionManager(emf);
            }
        }
    }
}