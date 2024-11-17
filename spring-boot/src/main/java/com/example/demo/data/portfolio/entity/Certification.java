package com.example.demo.data.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Immutable
@Table(name = "certifications")
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "title")
    @JsonProperty("title")
    private String title;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "issued_date")
    @JsonProperty("issuedDate")
    private String issuedDate;

    @Column(name = "cred_id")
    @JsonProperty("credId")
    private String credId;

    @Column(name = "reference")
    @JsonProperty("reference")
    private String reference;

    @Column(name = "logo")
    @JsonProperty("logo")
    private String logo;
}