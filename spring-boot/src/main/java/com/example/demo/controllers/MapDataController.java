package com.example.demo.controllers;

import com.example.demo.services.MapData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class MapDataController {
    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get Map")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved map"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })

    @GetMapping("mapdata")
    public List<MapData> getMapData() {
        List<MapData> mapDataList = new ArrayList<>();
        mapDataList.add(new MapData(19.0760, 72.8777, "Mumbai"));
        mapDataList.add(new MapData(18.5204, 73.8567, "Pune"));
        mapDataList.add(new MapData(19.1176, 72.9060, "Powai"));
        return mapDataList;
    }
}
