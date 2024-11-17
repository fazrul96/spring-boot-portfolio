package com.example.demo.data.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.Immutable;

import static com.example.demo.constants.InterfaceSchemaConstant.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Immutable
public class PortfolioView {

    @Id
    @Column(name = ID)
    private Integer id;

    @Column(name = STATUS)
    private Integer status;
}