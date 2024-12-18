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
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

import static com.example.demo.exception.BatchErrorType.GENERIC_ERROR;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.example.demo.data.management",
        entityManagerFactoryRef = "managementEntityManagerFactory",
        transactionManagerRef = "managementTransactionManager"
)
public class ManagementDataSourcesConfiguration {
    @Bean("managementConfig")
    @ConfigurationProperties("spring.datasource.management")
    public HikariConfig appHikariConfig() {
        return new HikariConfig();
    }

    @Bean("managementDataSource")
    public HikariDataSource appDataSource(@Qualifier("managementConfig") HikariConfig hikariConfig) {
        return new HikariDataSource(hikariConfig);
    }

    @Bean(name = "managementEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(
        @Autowired EntityManagerFactoryBuilder builder,
        @Qualifier("managementDataSource") DataSource managementDataSource) {
        return builder
                .dataSource(managementDataSource)
                .packages("com.example.demo.data.management")
                .build();
    }

    @Bean("managementTransactionManager")
    public PlatformTransactionManager platformTransactionManager(
            @Qualifier("managementEntityManagerFactory")
            LocalContainerEntityManagerFactoryBean entityManagerFactoryBean)
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