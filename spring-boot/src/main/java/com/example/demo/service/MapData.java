package com.example.demo.service;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MapData {
    private double latitude;
    private double longitude;
    private String name;

    public MapData(double latitude, double longitude, String name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }
}