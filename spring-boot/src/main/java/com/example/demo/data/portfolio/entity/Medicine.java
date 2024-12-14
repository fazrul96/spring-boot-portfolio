package com.example.demo.data.portfolio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {
    @Id
    private UUID id;

    private String name;

    private MedicineCategory type;

    private Timestamp expirationDate;

    private Double originalPrice;

    private Double salePrice;
}