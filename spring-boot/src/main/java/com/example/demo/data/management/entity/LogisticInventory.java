package com.example.demo.data.management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static com.example.demo.constants.ModelConstant.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = TBL_LOGISTIC_INVENTORY)
public class LogisticInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ID)
    @JsonProperty("id")
    private Long id;

    @Column(name = "item_name")
    @JsonProperty("itemName")
    private String itemName;

    @Column(name = "description")
    @JsonProperty("description")
    private String description;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "status")
    @JsonProperty("status")
    private String status;

    @Column(name = "image_link")
    @JsonProperty("imageLink")
    private String imageLink;

    @Column(name = CREATED_AT)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @Column(name = UPDATED_AT)
    @JsonProperty("updatedAt")
    private LocalDateTime  updatedAt;
}
