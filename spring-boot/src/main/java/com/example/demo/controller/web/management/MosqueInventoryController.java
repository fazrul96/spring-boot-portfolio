package com.example.demo.controller.web.management;

import com.example.demo.data.management.entity.LogisticInventory;
import com.example.demo.service.web.management.MosqueInventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.demo.constants.ApiConstant.MOSQUE_INVENTORIES;
import static com.example.demo.constants.ApiConstant.MOSQUE_INVENTORIES_ID;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class MosqueInventoryController extends BaseController {
    private final MosqueInventoryService mosqueInventoryService;

    @Operation(summary = "Fetch all logistic inventories")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of logistic inventories"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_INVENTORIES)
    public ResponseEntity<List<LogisticInventory>> getAllUserLogistics() {
        List<LogisticInventory> logisticInventories = mosqueInventoryService.getAllLogisticInventories();
        return success(logisticInventories);
    }

    @Operation(summary = "Create a new logistic inventory record")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created the new logistic inventory record"),
            @ApiResponse(responseCode = "400", description = "Invalid input data for logistic inventory"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = MOSQUE_INVENTORIES)
    public ResponseEntity<LogisticInventory> createLogisticInventory(@Valid @RequestBody LogisticInventory logisticInventory) {
        mosqueInventoryService.createLogisticInventory(logisticInventory);
        return created(logisticInventory);
    }

    @Operation(summary = "Delete a logistic inventory record by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the logistic inventory record"),
            @ApiResponse(responseCode = "404", description = "Logistic inventory not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = MOSQUE_INVENTORIES_ID)
    public ResponseEntity<Void> deleteLogisticInventory(@PathVariable Long id) {
        mosqueInventoryService.deleteLogisticInventory(id);
        return noContent();
    }

    @Operation(summary = "Update a logistic inventory record partially")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully updated the logistic inventory record"),
            @ApiResponse(responseCode = "404", description = "Logistic inventory not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PatchMapping(path = MOSQUE_INVENTORIES_ID)
    public ResponseEntity<LogisticInventory> updateLogisticInventoryPartially(
            @PathVariable Long id,
            @RequestBody LogisticInventory partialLogistic) {
        LogisticInventory updatedLogistic =
                mosqueInventoryService.updateLogisticInventoryPartially(id, partialLogistic);
        return success(updatedLogistic);
    }

    @Operation(summary = "Update a logistic inventory record completely")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully updated the complete logistic inventory record"),
            @ApiResponse(responseCode = "404", description = "Logistic inventory not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(path = MOSQUE_INVENTORIES_ID)
    public ResponseEntity<LogisticInventory> updateLogisticInventory(
            @PathVariable Long id,
            @RequestBody LogisticInventory updatedLogistic) {
        LogisticInventory updatedLogisticInventory =
                mosqueInventoryService.updateLogisticInventory(id, updatedLogistic);
        return success(updatedLogisticInventory);
    }
}
