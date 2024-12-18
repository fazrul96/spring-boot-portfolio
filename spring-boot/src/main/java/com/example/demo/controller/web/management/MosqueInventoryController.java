package com.example.demo.controller.web.management;

import com.example.demo.data.management.entity.LogisticInventory;
import com.example.demo.service.web.management.MosqueInventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.example.demo.constants.ApiConstant.*;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class MosqueInventoryController {
    private final MosqueInventoryService mosqueInventoryService;

    @Autowired
    public MosqueInventoryController(MosqueInventoryService mosqueInventoryService) {
        this.mosqueInventoryService = mosqueInventoryService;
    }

    @Operation(summary = "Retrieve all logistic inventory")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved logistic inventory"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_INVENTORIES)
    public ResponseEntity<List<LogisticInventory>> getAllLogisticInventories() {
        List<LogisticInventory> logisticInventories = mosqueInventoryService.getAllLogisticInventories();
        return ResponseEntity.ok(logisticInventories);
    }

    @Operation(summary = "Retrieve a logistic inventory by status")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the logistic inventory"),
            @ApiResponse(responseCode = "404", description = "Logistic inventory not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_INVENTORIES_ID)
    public ResponseEntity<Optional<LogisticInventory>> getLogisticInventoryById(@PathVariable String id) {
        Optional<LogisticInventory> logisticInventory = mosqueInventoryService.getLogisticInventoryById(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(logisticInventory);
    }

    @Operation(summary = "Create a new logistic inventory")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created logistic inventory"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = MOSQUE_INVENTORIES)
    public ResponseEntity<LogisticInventory> saveLogisticInventories(
            @Valid @RequestBody LogisticInventory logisticInventory) {
        mosqueInventoryService.saveLogisticInventory(logisticInventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(logisticInventory);
    }

//    @Operation(summary = "Delete an webtoon by ID")
//    @ApiResponses({
//            @ApiResponse(responseCode = "204", description = "Successfully deleted the logistic inventory"),
//            @ApiResponse(responseCode = "404", description = "Logistic inventory not found"),
//            @ApiResponse(responseCode = "500", description = "Internal server error")
//    })
//    @DeleteMapping(path = MOSQUE_INVENTORIES_STATUS)
//    public ResponseEntity<Void> deleteLogisticInventory(@PathVariable String id) {
//        mosqueInventoryService.deleteLogisticInventory(id);
//        return ResponseEntity.noContent().build();
//    }
}
