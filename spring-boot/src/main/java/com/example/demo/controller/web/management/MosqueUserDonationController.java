package com.example.demo.controller.web.management;

import com.example.demo.data.management.entity.UserDonation;
import com.example.demo.service.web.management.MosqueUserDonationService;
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

import static com.example.demo.constants.ApiConstant.*;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class MosqueUserDonationController {
    private final MosqueUserDonationService mosqueUserDonationService;

    @Autowired
    public MosqueUserDonationController(MosqueUserDonationService mosqueUserDonationService) {
        this.mosqueUserDonationService = mosqueUserDonationService;
    }

    @Operation(summary = "Retrieve all user donation")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user donation"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_USER_DONATIONS)
    public ResponseEntity<List<UserDonation>> getAllWebtoons() {
        List<UserDonation> userDonations = mosqueUserDonationService.getAllUserDonations();
        return ResponseEntity.ok(userDonations);
    }

    @Operation(summary = "Retrieve a user donation by nric")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the user donation"),
            @ApiResponse(responseCode = "404", description = "User donation not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = MOSQUE_USER_DONATIONS_NRIC)
    public ResponseEntity<UserDonation> getWebtoonByTitle(@PathVariable String nric) {
        UserDonation userDonation = mosqueUserDonationService.getUserDonationByNric(nric);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDonation);
    }

    @Operation(summary = "Create a new user donations")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created user donations"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = MOSQUE_USER_DONATIONS)
    public ResponseEntity<UserDonation> createUserDonations(@Valid @RequestBody UserDonation userDonation) {
        mosqueUserDonationService.saveUserDonation(userDonation);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDonation);
    }

    @Operation(summary = "Delete an webtoon by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the webtoon"),
            @ApiResponse(responseCode = "404", description = "Webtoon not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = MOSQUE_USER_DONATIONS_NRIC)
    public ResponseEntity<Void> deleteUserDonations(@PathVariable String nric) {
        mosqueUserDonationService.deleteUserDonations(nric);
        return ResponseEntity.noContent().build();
    }
}
