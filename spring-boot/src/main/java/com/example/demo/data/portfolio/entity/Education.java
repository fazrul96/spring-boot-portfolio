package com.example.demo.data.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "educations")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "module")
    @JsonProperty("module")
    private String module;

    @Column(name = "year")
    @JsonProperty("year")
    private String year;
}