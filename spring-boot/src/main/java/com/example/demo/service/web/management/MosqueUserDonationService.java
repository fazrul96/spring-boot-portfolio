package com.example.demo.service.web.management;

import com.example.demo.data.management.entity.UserDonation;
import com.example.demo.data.management.repository.MosqueUserRepository;
import com.example.demo.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.demo.exception.errorType.AppErrorType.RESOURCE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Slf4j
public class MosqueUserDonationService {
    private final MosqueUserRepository mosqueUserRepository;

    public List<UserDonation> getAllUserDonations() {
        log.debug("Fetching all user donations");
        List<UserDonation> donations = mosqueUserRepository.findAllOrderedByUpdatedAt();
        log.debug("Fetched {} user donations", donations.size());
        return donations;
    }

    public UserDonation getUserDonationByNric(String nric) throws BaseException {
        log.debug("Fetching user donation for NRIC: {}", nric);
        return Optional.ofNullable(mosqueUserRepository.findByNric(nric))
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "User donation not found for NRIC: " + nric));
    }

    @Transactional
    public UserDonation createUserDonation(UserDonation userDonation) {
        log.info("Creating user donation: {}", userDonation);
        UserDonation savedDonation = mosqueUserRepository.save(userDonation);
        log.info("User donation created: {}", savedDonation);
        return savedDonation;
    }

    @Transactional
    public void deleteUserDonation(Long id) throws BaseException {
        log.debug("Deleting user donation with ID: {}", id);
        UserDonation donationToDelete = mosqueUserRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "User donation not found for ID: " + id));
        mosqueUserRepository.delete(donationToDelete);
        log.info("User donation deleted: {}", donationToDelete);
    }

    @Transactional
    public UserDonation updateUserDonationPartially(Long id, UserDonation partialUpdate) throws BaseException {
        log.debug("Partially updating user donation with ID: {}", id);
        UserDonation existingDonation = mosqueUserRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "User donation not found for ID: " + id));

        updateDonationFields(existingDonation, partialUpdate);
        UserDonation updatedDonation = mosqueUserRepository.save(existingDonation);
        log.info("User donation partially updated: {}", updatedDonation);
        return updatedDonation;
    }

    @Transactional
    public UserDonation updateUserDonation(Long id, UserDonation updatedDonation) throws BaseException {
        log.debug("Fully updating user donation with ID: {}", id);
        UserDonation existingDonation = mosqueUserRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "User donation not found for ID: " + id));

        existingDonation.setName(updatedDonation.getName());
        existingDonation.setAddress(updatedDonation.getAddress());
        existingDonation.setNric(updatedDonation.getNric());
        existingDonation.setDonation(updatedDonation.getDonation());
        existingDonation.setDate(updatedDonation.getDate());

        UserDonation savedDonation = mosqueUserRepository.save(existingDonation);
        log.info("User donation fully updated: {}", savedDonation);
        return savedDonation;
    }

    private void updateDonationFields(UserDonation existingDonation, UserDonation partialDonation) {
        if (partialDonation.getName() != null) {
            existingDonation.setName(partialDonation.getName());
        }
        if (partialDonation.getAddress() != null) {
            existingDonation.setAddress(partialDonation.getAddress());
        }
        if (partialDonation.getNric() != null) {
            existingDonation.setNric(partialDonation.getNric());
        }
        if (partialDonation.getDonation() != null) {
            existingDonation.setDonation(partialDonation.getDonation());
        }
        if (partialDonation.getDate() != null) {
            existingDonation.setDate(partialDonation.getDate());
        }
    }
}