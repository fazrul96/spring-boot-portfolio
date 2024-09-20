package com.example.demo.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Immutable
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "company_name")
    @JsonProperty("companyName")
    private String companyName;

    @Column(name = "company_type")
    @JsonProperty("companyType")
    private String companyType;

    @Column(name = "role")
    @JsonProperty("role")
    private String role;

    @Column(name = "tag")
    @JsonProperty("tag")
    private String tag;

    @Column(name = "year")
    @JsonProperty("year")
    private String year;

    @Column(name = "startdate")
    @JsonProperty("startdate")
    private String startdate;

    @Column(name = "enddate")
    @JsonProperty("enddate")
    private String enddate;

    @Column(name = "duration")
    @JsonProperty("duration")
    private String duration;

    @Column(name = "image")
    @JsonProperty("image")
    private String image;

    @Column(name = "alias")
    @JsonProperty("alias")
    private String alias;

    @OneToMany(mappedBy = "experience")
    private List<ExperienceItem> experienceItems;
}