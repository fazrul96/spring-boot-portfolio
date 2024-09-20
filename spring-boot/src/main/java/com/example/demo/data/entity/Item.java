package com.example.demo.data.entity;

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
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String name;
}