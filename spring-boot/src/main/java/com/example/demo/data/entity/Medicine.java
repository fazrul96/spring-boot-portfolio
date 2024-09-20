package com.example.demo.data.entity;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;

@Data
@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Immutable
public class Medicine {
    private UUID id;

    private String name;

    private MedicineCategory type;

    private Timestamp expirationDate;

    private Double originalPrice;

    private Double salePrice;
}