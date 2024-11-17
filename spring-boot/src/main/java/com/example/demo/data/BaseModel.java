package com.example.demo.data;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import static com.example.demo.constants.BatchConstant.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = CREATED_BY)
    private String createdBy;

    @Column(name = CREATED_DATE)
    private LocalDateTime createdDate;

    @Column(name = UPDATED_BY)
    private String updatedBy;

    @Column(name = UPDATED_DATE)
    private LocalDateTime updatedDate;
}
