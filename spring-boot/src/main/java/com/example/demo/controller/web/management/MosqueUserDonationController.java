package com.example.demo.controller.web.management;

import com.example.demo.data.management.entity.UserDonation;
import com.example.demo.service.web.management.MosqueUserDonationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.demo.constants.ApiConstant.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class MosqueUserDonationController extends BaseController {
    private final MosqueUserDonationService mosqueUserDonationService;

    @Operation(summary = "Fetch all user donations")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of user donations"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_USER_DONATIONS)
    public ResponseEntity<List<UserDonation>> getAllUserDonations() {
        List<UserDonation> donations = mosqueUserDonationService.getAllUserDonations();
        return success(donations);
    }

    @Operation(summary = "Retrieve a user donation by NRIC")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the user donation by NRIC"),
            @ApiResponse(responseCode = "404", description = "User donation not found for the given NRIC"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_USER_DONATIONS_NRIC)
    public ResponseEntity<UserDonation> getUserDonationByNric(@PathVariable String nric) {
        UserDonation userDonation = mosqueUserDonationService.getUserDonationByNric(nric);
        return success(userDonation);
    }

    @Operation(summary = "Create a new user donation record")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created the new user donation record"),
            @ApiResponse(responseCode = "400", description = "Invalid input data for user donation"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = MOSQUE_USER_DONATIONS)
    public ResponseEntity<UserDonation> createUserDonation(@Valid @RequestBody UserDonation userDonation) {
        mosqueUserDonationService.createUserDonation(userDonation);
        return created(userDonation);
    }

    @Operation(summary = "Delete a user donation record by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the user donation record"),
            @ApiResponse(responseCode = "404", description = "User donation not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = MOSQUE_USER_DONATIONS_ID)
    public ResponseEntity<Void> deleteUserDonation(@PathVariable Long id) {
        mosqueUserDonationService.deleteUserDonation(id);
        return noContent();
    }

    @Operation(summary = "Update a user donation record partially")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully updated the user donation record"),
            @ApiResponse(responseCode = "404", description = "User donation not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PatchMapping(path = MOSQUE_USER_DONATIONS_ID)
    public ResponseEntity<UserDonation> updateUserDonationPartially(
            @PathVariable Long id,
            @RequestBody UserDonation partialDonation) {
        UserDonation updatedDonation = mosqueUserDonationService.updateUserDonationPartially(id, partialDonation);
        return success(updatedDonation);
    }

    @Operation(summary = "Update a user donation record completely")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully updated the complete user donation record"),
            @ApiResponse(responseCode = "404", description = "User donation not found for the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(path = MOSQUE_USER_DONATIONS_ID)
    public ResponseEntity<UserDonation> updateUserDonation(
            @PathVariable Long id,
            @RequestBody UserDonation updatedDonation) {
        UserDonation updatedUserDonation = mosqueUserDonationService.updateUserDonation(id, updatedDonation);
        return success(updatedUserDonation);
    }
}