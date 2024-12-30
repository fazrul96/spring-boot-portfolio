package com.example.demo.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import static com.example.demo.constants.ModelConstant.CREATED_AT;
import static com.example.demo.constants.ModelConstant.UPDATED_AT;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = CREATED_AT)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @Column(name = UPDATED_AT)
    @JsonProperty("updatedAt")
    private LocalDateTime  updatedAt;
}
