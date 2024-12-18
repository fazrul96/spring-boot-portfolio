package com.example.demo.service.web.management;

import com.example.demo.data.management.entity.UserDonation;
import com.example.demo.data.management.repository.MosqueUserRepository;
import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class MosqueUserDonationService {
    private final MosqueUserRepository mosqueUserRepository;

    @Autowired
    public MosqueUserDonationService(MosqueUserRepository mosqueUserRepository) {
        this.mosqueUserRepository = mosqueUserRepository;
    }

    public List<UserDonation> getAllUserDonations() {
        return mosqueUserRepository.findAllOrderedByUpdatedAt();
    }

    public UserDonation getUserDonationByNric(String nric) {
        UserDonation userDonation = mosqueUserRepository.findByNric(nric);
        if (userDonation == null) {
            throw new IllegalArgumentException("User donation is empty");
        }
        return userDonation;
    }

    @Transactional
    public void saveUserDonation(UserDonation userDonation) {
        UserDonation user = new UserDonation();
        user.setName(userDonation.getName());
        user.setAddress(userDonation.getAddress());
        user.setNric(userDonation.getNric());
        user.setDonation(userDonation.getDonation());
        user.setDate(userDonation.getDate());
        mosqueUserRepository.save(user);
        log.info("User donation have been saved: {}", user);
    }

    @Transactional
    public void deleteUserDonations(String nric) {
        UserDonation userDonation = mosqueUserRepository.findByNric(nric);
        if (userDonation != null) {
            mosqueUserRepository.delete(userDonation);
        }
    }
}
