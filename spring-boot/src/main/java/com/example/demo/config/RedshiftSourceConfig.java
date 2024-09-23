//package com.example.demo.config;
//
//import com.zaxxer.hikari.HikariConfig;
//import com.zaxxer.hikari.HikariDataSource;
//import jakarta.persistence.EntityManagerFactory;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//import javax.sql.DataSource;
//
//@Configuration
//@EnableTransactionManagement
//@EnableJpaRepositories(
//        basePackages = "com.example.demo.data.redshift",
//        entityManagerFactoryRef = "redshiftEntityManagerFactory",
//        transactionManagerRef = "redshiftTransactionManager"
//)
//@Slf4j
//public class RedshiftSourceConfig {
//    @Bean("redshiftBatchConfig")
//    @ConfigurationProperties("spring.datasource.redshift")
//    public HikariConfig redshiftHikariConfig() {
//        return new HikariConfig();
//    }
//
//    @Bean("redshiftDataSource")
//    public HikariDataSource redshiftDataSource(@Qualifier("redshiftBatchConfig") HikariConfig hikariConfig) {
//        return new HikariDataSource(hikariConfig);
//    }
//
//    @Bean(name = "redshiftEntityManagerFactory")
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
//            @Autowired EntityManagerFactoryBuilder builder,
//            @Qualifier("redshiftDataSource") DataSource redshiftDataSource) {
//        return builder
//                .dataSource(redshiftDataSource)
//                .packages("com.example.demo.data")
//                .build();
//    }
//
//    @Bean("redshiftTransactionManager")
//    public PlatformTransactionManager dataSourceTransactionManager(
//            @Qualifier("") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
//        if (entityManagerFactory == null) {
//            throw new RuntimeException("Bean not found: redshiftEntityManagerFactory");
//        } else {
//            EntityManagerFactory emf = entityManagerFactory.getObject();
//            if (emf == null) {
//                throw new RuntimeException("Bean not found: redshiftEntityManagerFactory");
//            } else {
//                return new JpaTransactionManager(emf);
//            }
//        }
//    }
//}
