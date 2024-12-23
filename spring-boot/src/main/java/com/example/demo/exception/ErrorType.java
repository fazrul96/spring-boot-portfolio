package com.example.demo.exception;

import java.io.Serializable;

import org.springframework.http.HttpStatus;

public interface ErrorType extends Serializable {
    String getCode();

    String getDesc();

    HttpStatus getHttpStatusCode();
}