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
        basePackages = "com.example.demo.data.portfolio",
        entityManagerFactoryRef = "portfolioEntityManagerFactory",
        transactionManagerRef = "portfolioTransactionManager"
)
public class PortfolioDataSourcesConfiguration {
    @Bean("portfolioConfig")
    @ConfigurationProperties("spring.datasource.portfolio")
    public HikariConfig appHikariConfig() {
        return new HikariConfig();
    }

    @Bean("portfolioDataSource")
    public HikariDataSource appDataSource(@Qualifier("portfolioConfig") HikariConfig hikariConfig) {
        return new HikariDataSource(hikariConfig);
    }

    @Bean(name = "portfolioEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(
        @Autowired EntityManagerFactoryBuilder builder,
        @Qualifier("portfolioDataSource") DataSource portfolioDataSource) {
        return builder
                .dataSource(portfolioDataSource)
                .packages("com.example.demo.data.portfolio")
                .build();
    }

    @Bean("portfolioTransactionManager")
    public PlatformTransactionManager platformTransactionManager(
            @Qualifier("portfolioEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactoryBean)
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