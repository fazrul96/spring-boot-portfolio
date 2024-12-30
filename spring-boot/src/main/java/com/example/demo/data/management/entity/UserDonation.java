package com.example.demo.data.management.entity;

import com.example.demo.data.BaseModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.example.demo.constants.ModelConstant.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = TBL_USER_DONATIONS)
public class UserDonation extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ID)
    @JsonProperty("id")
    private Long id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "address")
    @JsonProperty("address")
    private String address;

    @Column(name = "nric")
    @JsonProperty("nric")
    private String nric;

    @Column(name = "donation")
    @JsonProperty("donation")
    private Integer donation;

    @Column(name = "date")
    @JsonProperty("date")
    private LocalDate date;
}
